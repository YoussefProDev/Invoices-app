import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";

import { redirect } from "next/navigation";

import { ClientType } from "@/types/schemasTypes";
import { ClientWithAddress } from "@/types/dataTypes";
import ClientForm from "@/components/client/form/ClientForm";

async function Authorize(clientId: string, userId: string) {
  const client = await db.client.findUnique({
    where: {
      id: clientId,
      userId: userId,
    },
    include: {
      address: true,
    },
  });

  if (!client) {
    return redirect("/dashboard/clients");
  }
  return client;
}
type Params = Promise<{ clientId: string }>;

export default async function EditClientPage({ params }: { params: Params }) {
  const userSession = await requireUserSession();
  const { clientId } = await params;

  const client: ClientWithAddress = await Authorize(
    clientId,
    userSession?.id as string
  );
  return <ClientForm client={client} />;
}
const clientMapper = (client: ClientWithAddress): ClientType => {
  return {
    name: client.name,
    email: client.email || "", // Email opzionale, vuoto se assente
    codiceDestinatario: client.codiceDestinatario || undefined, // Valore opzionale
    pecDestinatario: client.pecDestinatario || undefined, // Valore opzionale
    codiceFiscale: client.codiceFiscale || "", // Codice Fiscale è richiesto da ClientSchema
    address: client.address
      ? {
          cap: client.address.cap || "",
          comune: client.address.comune || "",
          provincia: client.address.provincia || "",
          street: client.address.street || "",
        }
      : {
          cap: "",
          comune: "",
          provincia: "",
          street: "",
        }, // Forniamo valori di fallback
  };
};
