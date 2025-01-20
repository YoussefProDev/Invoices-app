"use server";

import { requireUserSession } from "@/utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import { resend } from "@/lib/resend";
import { InvoiceSchema } from "@/schemas";
import { AddressType, InvoiceType } from "@/types/schemasTypes";
import { getUserById, getUserSession } from "@/utils/auth/users";
import { addressMapper } from "@/utils/mappers/address";
import { isInvoiceNumberUniqueForYear } from "@/utils/invoices";
// Function to create a client
export const createInvoice = async (invoiceForm: InvoiceType) => {
  const validatedFields = InvoiceSchema.safeParse(invoiceForm);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields in the form!",
      details: validatedFields.error.format(),
    };
  }

  const userId = await getUserSession(); // Ensure userId is always valid
  const user = await getUserById(userId);

  const {
    client,
    currency,
    date,
    invoiceNumber,
    invoiceType,
    regimeFiscale,
    services,
    status,
    total,
    note,
    paymentDetails,
  } = validatedFields.data;
  const isInvoiceNumberValid = await isInvoiceNumberUniqueForYear(
    +invoiceNumber,
    date.getFullYear()
  );
  if (!isInvoiceNumberValid) {
    return {
      error: "Invoice number must be unique for the year!",
    };
  }

  const clientAddress = addressMapper(client.address);

  const data = await db.invoice.create({
    data: {
      clientEmail: client.email as string,
      clientName: client.name,
      clientCF: client.codiceFiscale,
      clientPec: client.pecDestinatario,
      clientAddress,
      currency,
      date,
      fromAddress: user?.businessDetail?.address as string,
      fromEmail: user?.email as string,
      fromName: `${user?.firstName} ${user?.lastName}`,
      invoiceType,
      regimeFiscale,
      year: date.getFullYear(),
      invoiceNumber: +invoiceNumber,
      services: {
        create: [...services],
      },
      user: {
        connect: {
          id: userId,
        },
      },
      status,
      total,
      note,
    },
  });

  const sender = {
    email: client.email,
    name: client.name,
  };

  // resend.emails.send({
  //   from: sender.email,
  //   to: ["jan@alenix.de"],
  //   template_uuid: "3c01e4ee-a9ed-4cb6-bbf7-e57c2ced6c94",
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "long",
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: formatCurrency({
  //       amount: submission.value.total,
  //       currency: submission.value.currency as any,
  //     }),
  //     invoiceLink: `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice/${data.id}`,
  //   },
  // });

  return redirect("/dashboard/invoices");
};

export async function editInvoice(prevState: any, formData: FormData) {
  const userSession = await requireUserSession();

  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // const data = await db.invoice.update({
  //   where: {
  //     id: formData.get("id") as string,
  //     userId: session.user?.id,
  //   },
  //   data: {
  //     clientAddress: submission.value.clientAddress,
  //     clientEmail: submission.value.clientEmail,
  //     clientName: submission.value.clientName,
  //     currency: submission.value.currency,
  //     date: submission.value.date,
  //     dueDate: submission.value.dueDate,
  //     fromAddress: submission.value.fromAddress,
  //     fromEmail: submission.value.fromEmail,
  //     fromName: submission.value.fromName,
  //     // invoiceItemDescription: submission.value.invoiceItemDescription,
  //     // invoiceItemQuantity: submission.value.invoiceItemQuantity,
  //     // invoiceItemRate: submission.value.invoiceItemRate,
  //     invoiceName: submission.value.invoiceName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     status: submission.value.status,
  //     total: submission.value.total,
  //     note: submission.value.note,
  //   },
  // });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Jan Marshal",
  };

  // emailClient.send({
  //   from: sender,
  //   to: [{ email: "jan@alenix.de" }],
  //   template_uuid: "9d04aa85-6896-48a8-94e9-b54354a48880",
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "long",
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: formatCurrency({
  //       amount: submission.value.total,
  //       currency: submission.value.currency as any,
  //     }),
  //     invoiceLink:
  //       process.env.NODE_ENV !== "production"
  //         ? `http://localhost:3000/api/invoice/${data.id}`
  //         : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
  //   },
  // });

  return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUserSession();

  const data = await db.invoice.delete({
    where: {
      userId: session.id as string,
      id: invoiceId,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function MarkAsPaidAction(invoiceId: string) {
  const session = await requireUserSession();

  const data = await db.invoice.update({
    where: {
      userId: session.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });

  return redirect("/dashboard/invoices");
}
