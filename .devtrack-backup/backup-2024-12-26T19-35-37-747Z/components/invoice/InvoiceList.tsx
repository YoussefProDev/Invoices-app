import { InvoiceActions } from "./InvoiceActions";
import { db } from "@/lib/db";
import { requireUser } from "@/utils/hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@prisma/client";
import { Field } from "@/types/dataTypes";
import { DynamicTable } from "../DynamicTable";

async function getData(userId: string) {
  const data = await db.invoice.findMany({
    where: {
      userId: userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
export async function InvoiceList() {
  const session = await requireUser();
  const Invoices = await getData(session.user?.id as string);

  const invoiceFields: Field<Invoice>[] = [
    {
      label: "Invoice ID",
      key: "invoiceNumber",
      sticky: true,
      format: (value) => `#${value}`,
    },
    { label: "Customer", key: "clientName" },
    {
      label: "Amount",
      key: "total",
      format: (value, row) =>
        formatCurrency({ amount: value, currency: row.currency as any }),
    },
    {
      label: "Status",
      key: "status",
      format: (value) => <Badge>{value}</Badge>,
    },
    {
      label: "Date",
      key: "createdAt",
      format: (value) =>
        new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(value),
    },
  ];

  return (
    <>
      <DynamicTable<Invoice>
        data={Invoices}
        fields={invoiceFields}
        renderActions={(invoice) => (
          <InvoiceActions id={invoice.id} status={invoice.status} />
        )}
        emptyState={{
          title: "No invoices found",
          description: "Create an invoice to get started",
          buttonText: "Create invoice",
          href: "/dashboard/invoices/create",
        }}
      />
    </>
  );
}
