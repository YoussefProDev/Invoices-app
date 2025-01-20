import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/utils/formatCurrency";
import { getUserById, getUserSession } from "@/utils/auth/users";
import { Invoice, User } from "@prisma/client";
import { format } from "date-fns";
import { UserWithBusinessDetail } from "@/types/schemasTypes";

// Utility function to format dates
function formatDate(date: Date): string {
  return format(date, "dd.MM.yy");
}

// PDF Generator class to encapsulate PDF generation logic
class PDFGenerator {
  private pdf: jsPDF;
  private margin: number;
  private y: number;
  private rowHeight: number;
  private headerFont: string;
  private bodyFont: string;
  private fontSizeHeader: number;
  private fontSizeBody: number;

  constructor() {
    this.pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    this.margin = 20;
    this.y = this.margin;
    this.rowHeight = 6;
    this.headerFont = "helvetica";
    this.bodyFont = "helvetica";
    this.fontSizeHeader = 12;
    this.fontSizeBody = 10;
  }

  // Method to add styled text to the PDF
  addStyledText(
    text: string,
    x: number,
    y: number,
    font: string,
    style: string,
    size: number
  ): void {
    this.pdf.setFont(font, style);
    this.pdf.setFontSize(size);
    this.pdf.text(text, x, y);
  }

  // Method to add company details to the PDF
  addCompanyDetails(user: UserWithBusinessDetail): void {
    this.addStyledText(
      user.businessDetail?.companyName || "",
      this.margin,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeHeader
    );
    this.y += this.rowHeight;

    if (user.businessDetail) {
      this.addStyledText(
        `${user.businessDetail.address}`,
        this.margin,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.y += this.rowHeight;

      this.addStyledText(
        `Partita IVA: ${user.businessDetail.vatNumber} - Cod. Fisc: ${user.businessDetail.taxCode}`,
        this.margin,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.y += this.rowHeight * 2;
    }
  }

  // Method to add invoice details to the PDF
  addInvoiceDetails(data: Invoice): void {
    this.addStyledText(
      `Data: ${formatDate(new Date(data.date))} CLIENTE`,
      this.margin,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeHeader
    );
    this.y += this.rowHeight;

    this.addStyledText(
      `FATTURA ${data.invoiceNumber} ${data.clientName}`,
      this.margin,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeHeader
    );
    this.y += this.rowHeight;

    this.addStyledText(
      `${data.clientAddress}`,
      this.margin,
      this.y,
      this.bodyFont,
      "normal",
      this.fontSizeBody
    );
    this.y += this.rowHeight;

    this.addStyledText(
      `Pi: ${data.clientPec} - CF: ${data.clientCF}`,
      this.margin,
      this.y,
      this.bodyFont,
      "normal",
      this.fontSizeBody
    );
    this.y += this.rowHeight * 2;
  }

  // Method to add services table to the PDF
  addServicesTable(services: any[]): void {
    this.addStyledText(
      "DESCRIZIONE MERCE",
      this.margin,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.addStyledText(
      "ONT",
      this.margin + 70,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.addStyledText(
      "IMPORTO UNIT.",
      this.margin + 90,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.addStyledText(
      "IMPORTO TOT",
      this.margin + 110,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.addStyledText(
      "% IVA",
      this.margin + 130,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.y += this.rowHeight;

    services.forEach((service) => {
      const imponibile = service.quantity * service.pricePerUnit;
      const importoTot = imponibile.toFixed(2).replace(".", ",");
      this.y += this.rowHeight;
      this.addStyledText(
        service.description,
        this.margin,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.addStyledText(
        service.quantity.toString(),
        this.margin + 70,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.addStyledText(
        service.pricePerUnit.toFixed(2).replace(".", ","),
        this.margin + 90,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.addStyledText(
        importoTot,
        this.margin + 110,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.addStyledText(
        service.ivaRate,
        this.margin + 130,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
    });
    this.y += this.rowHeight * 2;
  }

  // Method to add summary table to the PDF
  addSummaryTable(services: any[]): void {
    const vatGroups = new Map<
      string,
      { imponibile: number; imposta: number }
    >();

    services.forEach((service) => {
      const rate = service.ivaRate;
      const imponibile = service.quantity * service.pricePerUnit;
      const imposta = imponibile * (parseFloat(rate) / 100);

      if (vatGroups.has(rate)) {
        const group = vatGroups.get(rate);
        if (group) {
          group.imponibile += imponibile;
          group.imposta += imposta;
        }
      } else {
        vatGroups.set(rate, { imponibile, imposta });
      }
    });

    this.addStyledText(
      "% IVA",
      this.margin,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.addStyledText(
      "IMPONIBILE",
      this.margin + 50,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.addStyledText(
      "IMPOSTA",
      this.margin + 100,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeBody
    );
    this.y += this.rowHeight;

    vatGroups.forEach((group, rate) => {
      this.y += this.rowHeight;
      this.addStyledText(
        rate,
        this.margin,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.addStyledText(
        group.imponibile.toFixed(2).replace(".", ","),
        this.margin + 50,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
      this.addStyledText(
        group.imposta.toFixed(2).replace(".", ","),
        this.margin + 100,
        this.y,
        this.bodyFont,
        "normal",
        this.fontSizeBody
      );
    });
    this.y += this.rowHeight * 2;
  }

  // Method to add notes section to the PDF
  addNotesSection(): void {
    this.addStyledText(
      "NOTE",
      this.margin,
      this.y,
      this.headerFont,
      "bold",
      this.fontSizeHeader
    );
    this.y += this.rowHeight * 2;

    this.addStyledText(
      "BONIFICO BANCARIO SU IBAN:",
      this.margin,
      this.y,
      this.bodyFont,
      "normal",
      this.fontSizeBody
    );
    this.y += this.rowHeight;
  }

  // Method to get the PDF buffer
  getPDFBuffer(): ArrayBuffer {
    return this.pdf.output("arraybuffer");
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;
  const userId = await getUserSession();

  if (!userId) {
    return NextResponse.json(
      { error: "User session not found" },
      { status: 401 }
    );
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const data = await db.invoice.findUnique({
    where: { id: invoiceId },
    include: { services: true },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdfGenerator = new PDFGenerator();
  pdfGenerator.addCompanyDetails(user);
  pdfGenerator.addInvoiceDetails(data);
  pdfGenerator.addServicesTable(data.services);
  pdfGenerator.addSummaryTable(data.services);
  pdfGenerator.addNotesSection();

  const pdfBuffer = pdfGenerator.getPDFBuffer();
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=invoice_${data.invoiceNumber}.pdf`,
    },
  });
}
