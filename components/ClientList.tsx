import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { requireUser } from "@/utils/hooks";
import { EmptyState } from "./EmptyState";
import { ClientActions } from "./ClientActions";

async function getClients(userId: string) {
  return db.client.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function ClientList() {
  const session = await requireUser();
  const clients = await getClients(session.user?.id as string);

  return (
    <>
      {clients.length === 0 ? (
        <EmptyState
          title="No clients found"
          description="Add a client to get started"
          buttontext="Add client"
          href="/dashboard/clients/create"
        />
      ) : (
        <Table className="min-w-[700px] table-auto border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead
                className="sticky left-0 bg-white z-10 shadow-sm"
                style={{ minWidth: "100px" }}
              >
                Client Name
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pec</TableHead>
              <TableHead>Codice Destinatario</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="sticky left-0 bg-white z-10 shadow-sm truncate max-w-[150px]">
                  {client.name}
                </TableCell>
                <TableCell>{client.email || "N/A"}</TableCell>
                <TableCell>{client.pecDestinatario || "N/A"}</TableCell>
                <TableCell>{client.codiceDestinatario || "N/A"}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(new Date(client.createdAt))}
                </TableCell>
                <TableCell className="text-right">
                  <ClientActions id={client.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
