import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
  const data = await db.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const userSession = await requireUserSession();
  const data = await getData(invoiceId, userSession?.id as string);

  return (
    <>
      edit invoice route
      {/* <EditInvoice data={data} /> */}
    </>
  );
}
