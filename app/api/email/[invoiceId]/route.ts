import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const userSession = await requireUserSession();

    const { invoiceId } = await params;

    const invoiceData = await db.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: userSession?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Jan Marshal",
    };

    // emailClient.send({
    //   from: sender,
    //   to: [{ email: "jan@alenix.de" }],
    //   template_uuid: "03c0c5ec-3f09-42ab-92c3-9f338f31fe2c",
    //   template_variables: {
    //     first_name: invoiceData.clientName,
    //     company_info_name: "InvoiceMarshal",
    //     company_info_address: "Chad street 124",
    //     company_info_city: "Munich",
    //     company_info_zip_code: "345345",
    //     company_info_country: "Germany",
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
