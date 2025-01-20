import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";

import { redirect } from "next/navigation";

import { ClientType, ClientTypeWithId } from "@/types/schemasTypes";
import {} from "@/types/dataTypes";
import ClientForm from "@/components/client/form/ClientForm";
import { addressParser } from "@/utils/mappers/address";
import { Client } from "@prisma/client";
import { clientMapper } from "@/utils/client";

async function Authorize(clientId: string, userId: string) {
  const client = await db.client.findUnique({
    where: {
      id: clientId,
      userId: userId,
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

  const client: Client = await Authorize(clientId, userSession?.id as string);
  return <ClientForm client={clientMapper(client)} />;
}
