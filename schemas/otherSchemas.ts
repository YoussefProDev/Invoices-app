import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),

  cap: z
    .string()
    .regex(new RegExp(/\d{5}/), {
      message: "Invalid CAP",
    })
    .min(1, "CAP is required"),
  comune: z.string().min(1, "Comune is required"),
  provincia: z.string().min(1, "Provincia is required"),
});
export const onBoardingSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  vatNumber: z
    .string()
    .regex(new RegExp(/^[a-zA-Z]{2}[0-9]{11}$/i), {
      message: "Invalid Vat Number",
    })
    .min(11, "VAT Number must be at least 11 characters")
    .max(11, "VAT Number must not exceed 11 characters"),
  taxCode: z
    .string()
    .regex(
      new RegExp(
        /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/i
      ),
      {
        message: "Invalid Tax code",
      }
    ),
  pec: z
    .string()
    .regex(
      new RegExp(/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@(pec.)+[A-Z]{2,}$/i),
      "Invalid  address"
    ),

  address: AddressSchema,
});

export const UserSchema = z.object({
  clientName: z.string().min(1, "Name is required"),
  clientAddress: AddressSchema,
  codiceDestinatario: z.string().optional(),
  pecDestinatario: z.string().email("Invalid PEC address").optional(),
  clientEmail: z.string().email("Invalid email address").optional(),
});
export const ClientSchema = z.object({
  clientName: z.string().min(1, "Name is required"),
  clientAddress: AddressSchema,
  clientCF: z.string().regex(/d/),
  codiceDestinatario: z.string().optional(),
  pecDestinatario: z.string().email("Invalid PEC address").optional(),
  clientEmail: z.string().email("Invalid email address").optional(),
});
export const ServiceSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  pricePerUnit: z.number().positive("Price per unit must be positive"),
  ivaRate: z.number().positive("IVA rate must be positive"),
  nature: z.string().min(1, "Nature is required"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  totalPrice: z.number().positive("Total price must be positive"),
  invoiceId: z.string(),
});

export const PaymentDetailsSchema = z.object({
  iban: z.string().optional(),
  bankName: z.string().optional(),
  beneficiary: z.string().optional(),
  invoiceId: z.string().min(1, "Invoice ID is required"),
});

export const InvoiceSchema = z.object({
  client: ClientSchema,
  invoiceType: z.enum([
    "FATTURA",
    "ACCONTO_FATTURA",
    "ACCONTO_PARCELLA",
    "NOTA_CREDITO",
    "NOTA_DEBITO",
    "PARCELLA",
    "INTEGRAZIONE_FATTURA_REVERSE_CHARGE_INTERNO",
    "INTEGRAZIONE_AUTOFATTURA_SERVIZI_ESTERO",
    "INTEGRAZIONE_BENI_INTRACOMUNITARI",
    "INTEGRAZIONE_BENI_EX_ART_17",
    "AUTOFATTURA_REGOLARIZZAZIONE",
    "AUTOFATTURA_SPLAFONAMENTO",
    "ESTRAZIONE_BENI_DEPOSITO_IVA",
    "FATTURA_DIFFERITA_A",
    "FATTURA_DIFFERITA_B",
    "CESSIONE_BENI_AMMORTIZZABILI",
    "AUTOCONSUMO_CESSIONI_GRATUITE",
    "ACQUISTI_SAN_MARINO",
  ]),
  regimeFiscale: z.enum([
    "ORDINARIO",
    "FORFETTARIO",
    "MINIMI",
    "IVA_PER_CASSA",
    "EDITORIA",
    "IVA_PER_CASSA_PA",
    "AGRICOLTURA",
    "AGENZIE_VIAGGI",
    "VENDITA_SALI_TABACCHI",
    "BENI_USATI",
    "INTRATTENIMENTI",
    "AGRITURISMO",
    "VENDITE_DOMICILIO",
    "COMMERCIO_FIAMMIFERI",
    "GESTIONE_SERVIZI_TELEFONIA",
    "RIVENDITA_DOCUMENTI",
    "AGENZIE_VENDITE_ASTA",
    "ALTRO",
  ]),
  invoiceNumber: z.string().refine((value) => +value > 0, {
    message: "Invoice Number must be positive",
  }),

  date: z.date(),
  status: z.enum(["PAID", "PENDING"]),
  services: ServiceSchema.array().optional(),
  note: z.string().optional(),
  // total: z.string().min(0, "Total must be a positive number"),
});
