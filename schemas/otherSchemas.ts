import {
  ivaValues,
  invoiceTypeOptions,
  regimeFiscaleOptions,
  ivaLabels,
  currencyOptions, // Assumiamo che ci sia un array di valute importato
} from "@/data/invoices"; // Import dynamic arrays
import { isInvoiceNumberUniqueForYear } from "@/utils/invoices";
import { z } from "zod";

// Schema for the address
export const AddressSchema = z.object({
  street: z
    .string()
    .min(1, "Street is required. Please provide the street name."),
  cap: z
    .string()
    .regex(/^\d{5}$/, {
      message: "Invalid CAP.",
    })
    .min(1, "CAP is required"),
  comune: z.string().min(1, "Comune is required"),
  provincia: z.string().min(1, "Provincia is required"),
});

// Onboarding schema
export const onBoardingSchema = z.object({
  companyName: z.string().min(1, "Company Name is required."),
  vatNumber: z.string().regex(/^[a-zA-Z]{2}[0-9]{11}$/i, {
    message: "Invalid VAT Number.",
  }),
  taxCode: z
    .string()
    .regex(
      /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/i,
      {
        message: "Invalid Tax Code.",
      }
    ),
  pec: z
    .string()
    .regex(
      /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@(pec\.)+[A-Z]{2,}$/i,
      "Invalid PEC address."
    ),
  address: AddressSchema,
});

// Client schema (user with address)
export const UserSchema = z.object({
  clientName: z
    .string()
    .min(1, "Client Name is required. Please provide a valid name."),
  clientAddress: AddressSchema,
  codiceDestinatario: z
    .string()
    .regex(/^[a-zA-Z0-9]{6,7}$/, {
      message:
        "Invalid Codice Destinatario. It must be 6 or 7 alphanumeric characters.",
    })
    .optional(),
  pecDestinatario: z
    .string()
    .email("Invalid PEC address. Please provide a valid PEC email.")
    .optional(),
  clientEmail: z
    .string()
    .email("Invalid email address. Please provide a valid email.")
    .optional(),
});

// Client schema with CF (codice fiscale)
export const ClientSchema = z.object({
  name: z
    .string()
    .min(1, "Client Name is required. Please provide a valid name."),
  address: AddressSchema,
  codiceFiscale: z
    .string()
    .regex(
      /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/i,
      {
        message: "Invalid Codice Fiscale.",
      }
    ),
  codiceDestinatario: z
    .string()
    .regex(/^[a-zA-Z0-9]{6,7}$/, {
      message: "Invalid Codice Destinatario.",
    })
    .optional(),
  pecDestinatario: z
    .string()
    .regex(
      /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@(pec\.)+[A-Z]{2,}$/i,
      "Invalid PEC address."
    )
    .optional(),
  email: z.string().email("Invalid email address.").optional(),
});

// Service schema (for individual services)
export const ServiceSchema = z
  .object({
    description: z
      .string()
      .min(
        1,
        "Service Description is required. Please provide a valid description."
      ),
    quantity: z
      .number()
      .positive(
        "Quantity must be a positive integer. Please provide a valid quantity."
      ),
    pricePerUnit: z
      .number()
      .positive(
        "Price per unit must be a positive number. Please provide a valid price."
      ),
    ivaRate: z.enum(ivaLabels, {
      errorMap: () => ({
        message: "IVA rate must be a valid value from the available options.",
      }),
    }),
    nature: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    totalPrice: z.number(),
  })
  .refine(
    (data) =>
      data.ivaRate !== "0%" || (data.nature && data.nature.trim() !== ""),
    {
      message: "Nature is required when IVA rate is 0.",
      path: ["nature"], // Link the error message to the "nature" field
    }
  );

// Array of services schema
export const ServicesSchema = ServiceSchema.array();

// Payment details schema
export const PaymentDetailsSchema = z.object({
  iban: z
    .string()
    .regex(/^[A-Z0-9]{15,34}$/, {
      message:
        "Invalid IBAN. It must be between 15 and 34 alphanumeric characters.",
    })
    .optional(),
  bankName: z.string().optional(),
  beneficiary: z.string().optional(),
  invoiceId: z
    .string()
    .min(1, "Invoice ID is required. Please provide a valid invoice ID."),
});

// Invoice schema
export const InvoiceSchema = z.object({
  client: ClientSchema,
  invoiceType: z.enum(invoiceTypeOptions, {
    errorMap: () => ({
      message:
        "Invalid Invoice Type. Please provide a valid type from the predefined list.",
    }),
  }),
  regimeFiscale: z.enum(regimeFiscaleOptions, {
    errorMap: () => ({
      message: "Invalid Regime Fiscale.",
    }),
  }),
  invoiceNumber: z.string().regex(/^\d+$/, {
    message: "Invoice Number must be a positive integer.",
  }),
  currency: z.enum(currencyOptions, {
    errorMap: () => ({
      message:
        "Invalid Currency. Please provide a valid currency from the predefined list.",
    }),
  }),
  total: z.string(),
  paymentDetails: PaymentDetailsSchema.optional(),
  date: z.date(),
  status: z.enum(["PAID", "PENDING"]),
  services: ServicesSchema.min(1, {
    message: "At least 1 service is mandatory.",
  }),
  note: z.string().max(500, "Note must not exceed 500 characters.").optional(),
});
