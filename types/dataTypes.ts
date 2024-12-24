import { currencyOptions } from "@/data/invoices";
import { Address, Client, Prisma } from "@prisma/client";
// Tipo che rappresenta tutte le stringhe contenute nell'array
export type Currency = (typeof currencyOptions)[number];

export type ClientWithAddress = Prisma.ClientGetPayload<{
  include: { address: true };
}>;
