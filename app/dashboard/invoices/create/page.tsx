import { CreateInvoice } from "@/components/CreateInvoice";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { db } from "@/lib/db";
import { requireUser } from "@/utils/hooks";
import { redirect } from "next/navigation";

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
      {/* <CreateInvoice
        lastName={data?.lastName as string}
        address={"ciao"} //? check later
        email={data?.email as string}
        firstName={data?.firstName as string}
      /> */}
    </>
  );
  // return (
  //   <CreateInvoice
  //     lastName={data?.lastName as string}
  //     address={"ciao"} //? check later
  //     email={data?.email as string}
  //     firstName={data?.firstName as string}
  //   />
  // );
}
