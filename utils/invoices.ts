import "server-only";
import { db } from "@/lib/db";
import { requireUserSession } from "./hooks";

export async function getInvoices(userId?: string) {
  const data = await db.invoice.findMany({
    where: {
      userId: userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

// Funzione per verificare se l'invoiceNumber è unico per anno
export const isInvoiceNumberUniqueForYear = async (
  invoiceNumber: number,
  year: number
): Promise<boolean> => {
  // Simula una query al database per verificare l'unicità
  // Sostituisci con la tua logica di accesso al database
  const { id } = await requireUserSession();
  const invoices = await getInvoices(id as string);
  return !invoices.some(
    (invoice) =>
      invoice.invoiceNumber === invoiceNumber && invoice.year === year
  );
};
