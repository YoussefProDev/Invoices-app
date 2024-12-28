import { db } from "@/lib/db";

export async function getClients(userId: string) {
  const clients = await db.client.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      address: true,
    },
  });
  return clients;
}
