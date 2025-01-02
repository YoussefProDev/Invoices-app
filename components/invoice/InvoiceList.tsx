"use client";
import { InvoiceActions } from "./InvoiceActions";

import { Badge } from "@/components/ui/badge";
import { Invoice } from "@prisma/client";
import { Field } from "@/types/dataTypes";
import { DynamicTable } from "../DynamicTable";
import { useData } from "@/providers/DataProvider";

export function InvoiceList() {
  const { invoices } = useData();

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
        data={invoices}
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
