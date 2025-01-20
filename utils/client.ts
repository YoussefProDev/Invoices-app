import { db } from "@/lib/db";
import { ClientTypeWithId } from "@/types/schemasTypes";
import { Client } from "@prisma/client";
import { addressParser } from "./mappers/address";

export const clientMapper = (client: Client): ClientTypeWithId => {
  return {
    id: client.id,
    name: client.name,
    email: client.email || "", // Email opzionale, vuoto se assente
    codiceDestinatario: client.codiceDestinatario || undefined, // Valore opzionale
    pecDestinatario: client.pecDestinatario || undefined, // Valore opzionale
    codiceFiscale: client.codiceFiscale || "", // Codice Fiscale è richiesto da ClientSchema
    address: addressParser(client.address || ""), // Forniamo valori di fallback
  };
};
export async function getClients(userId?: string) {
  const clients = await db.client.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clients.map((client) => clientMapper(client));
}
