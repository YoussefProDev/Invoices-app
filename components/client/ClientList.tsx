"use client";
import { DynamicTable } from "@/components/DynamicTable";
import { ClientActions } from "./ClientActions";
import { useData } from "@/providers/DataProvider";

import { FieldsType } from "@/types/dataTypes";
import { ClientTypeWithId } from "@/types/schemasTypes";

const InitialClientFields: FieldsType<ClientTypeWithId> = [
  { label: "Client Name", key: "name", sticky: true },
  {
    label: "Email",
    key: "email",
    format: (value: string | null) => value || "N/A",
  },
  {
    label: "Pec",
    key: "pecDestinatario",
    format: (value: string | null) => value || "N/A",
  },
  // {
  //   label: "Created At",
  //   key: "createdAt",
  //   format: (value: Date) =>
  //     new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(value),
  // },
];
export function ClientList({
  fields = InitialClientFields,
  onClick,
}: {
  fields?: FieldsType<ClientTypeWithId>;
  onClick?: (client: ClientTypeWithId) => void;
}) {
  const { clients } = useData();

  return (
    <DynamicTable<ClientTypeWithId>
      data={clients}
      fields={fields}
      renderActions={(client) => <ClientActions id={client.id} />}
      emptyState={{
        title: "No clients found",
        description: "Add a client to get started",
        buttonText: "Add client",
        href: "/dashboard/clients/create",
      }}
      onClick={onClick}
    />
  );
}
