import InvoiceForm from "@/components/invoice/form/InvoiceForm";
import { db } from "@/lib/db";
import { requireUser } from "@/utils/hooks";

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
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);
  return (
    <>
      <InvoiceForm />
    </>
  );
}
