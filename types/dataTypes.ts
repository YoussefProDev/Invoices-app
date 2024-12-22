import { currencyOptions } from "@/data/invoices";

// Tipo che rappresenta tutte le stringhe contenute nell'array
export type Currency = (typeof currencyOptions)[number];
