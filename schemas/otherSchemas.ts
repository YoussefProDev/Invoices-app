import {
  ivaValues,
  invoiceTypeOptions,
  regimeFiscaleOptions,
} from "@/data/invoices"; // Import dynamic arrays
import { z } from "zod";

// Schema for the address
export const AddressSchema = z.object({
  street: z
    .string()
    .min(1, "Street is required. Please provide the street name."),
  cap: z
    .string()
    .regex(/^\d{5}$/, {
      message: "Invalid CAP. It must consist of exactly 5 digits.",
    })
    .min(1, "CAP is required. Please provide a valid postal code."),
  comune: z
    .string()
    .min(1, "Comune is required. Please specify the city or town."),
  provincia: z
    .string()
    .min(1, "Provincia is required. Please specify the province."),
});

// Onboarding schema
export const onBoardingSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company Name is required. Please provide a valid name."),
  vatNumber: z.string().regex(/^[a-zA-Z]{2}[0-9]{11}$/i, {
    message:
      "Invalid VAT Number. It must start with two letters followed by 11 digits.",
  }),
  taxCode: z
    .string()
    .regex(
      /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/i,
      {
        message:
          "Invalid Tax Code. It must match the Italian format (16 alphanumeric characters or 11 digits).",
      }
    ),
  pec: z
    .string()
    .regex(
      /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@(pec\.)+[A-Z]{2,}$/i,
      "Invalid PEC address. Please provide a certified email address (PEC)."
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
  clientName: z
    .string()
    .min(1, "Client Name is required. Please provide a valid name."),
  clientAddress: AddressSchema,
  clientCF: z.string().regex(/^[A-Z0-9]{11,16}$/, {
    message: "Invalid Client CF. It must be 11 or 16 alphanumeric characters.",
  }),
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
    ivaRate: z
      .number()
      .min(0, { message: "IVA rate is required." }) // Ensure IVA rate is provided
      .refine((rate) => ivaValues.includes(rate), {
        message: "IVA rate must be a valid value from the available options.",
      }),
    nature: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    totalPrice: z.number(),
  })
  .refine(
    (data) => data.ivaRate !== 0 || (data.nature && data.nature.trim() !== ""),
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
      message:
        "Invalid Regime Fiscale. Please select a valid fiscal regime from the list.",
    }),
  }),
  invoiceNumber: z.string().regex(/^\d+$/, {
    message: "Invoice Number must be a positive integer.",
  }),
  currency: z.string().optional(),
  total: z.string().optional(),
  paymentDetails: PaymentDetailsSchema.optional(),
  date: z.date(),
  status: z.enum(["PAID", "PENDING"]),
  services: ServicesSchema.optional(),
  note: z.string().max(500, "Note must not exceed 500 characters.").optional(),
});
