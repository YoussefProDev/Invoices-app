import { db } from "@/lib/db";
import { requireUser } from "@/utils/hooks";

import { redirect } from "next/navigation";

import ClientForm from "@/components/client/ClientForm";
import { ClientType } from "@/types/schemasTypes";
import { ClientWithAddress } from "@/types/dataTypes";

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
  const session = await requireUser();
  const { clientId } = await params;
  console.log(clientId);

  const client: ClientWithAddress = await Authorize(
    clientId,
    session.user?.id as string
  );
  return <ClientForm client={client} />;
}
const clientMapper = (client: ClientWithAddress): ClientType => {
  return {
    clientName: client.name,
    clientEmail: client.email || "", // Email opzionale, vuoto se assente
    codiceDestinatario: client.codiceDestinatario || undefined, // Valore opzionale
    pecDestinatario: client.pecDestinatario || undefined, // Valore opzionale
    clientCF: client.codiceFiscale || "", // Codice Fiscale è richiesto da ClientSchema
    clientAddress: client.address
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
