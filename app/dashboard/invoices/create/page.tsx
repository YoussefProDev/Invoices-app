import InvoiceForm from "@/components/invoice/form/InvoiceForm";
import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";

async function getUserData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

export default async function InvoiceCreationRoute() {
  const userSession = await requireUserSession();
  const data = await getUserData(userSession?.id as string);
  return (
    <>
      <InvoiceForm />
    </>
  );
}
