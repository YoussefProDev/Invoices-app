import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  cap: z.string().min(1, "CAP is required"),
  comune: z.string().min(1, "Comune is required"),
  provincia: z.string().min(1, "Provincia is required"),
});
export const onBoardingSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  vatNumber: z
    .string()
    .min(11, "VAT Number must be at least 11 characters")
    .max(11, "VAT Number must not exceed 11 characters"),
  taxCode: z
    .string()
    .min(16, "Tax Code must be at least 16 characters")
    .max(16, "Tax Code must not exceed 16 characters"),

  pec: z
    .string()
    .regex(
      new RegExp(/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@(pec.)+[A-Z]{2,}$/i),
      "Invalid  address"
    ),

  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  cap: z.string().min(1, "CAP is required"),
  comune: z.string().min(1, "Comune is required"),
  provincia: z.string().min(1, "Provincia is required"),
});

export const ClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  addressId: z.string().min(1, "Address ID is required"),
  codiceDestinatario: z.string().optional(),
  pecDestinatario: z.string().email("Invalid PEC address").optional(),
  email: z.string().email("Invalid email address").optional(),
  emailVerified: z.date().optional(),
});

export const InvoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is required"),
  total: z.number().min(0, "Total must be a positive number"),
  status: z.enum(["PAID", "PENDING"]),
  date: z.date(),
  dueDate: z.number().positive("Due Date must be positive"),
  fromName: z.string().min(1, "From Name is required"),
  fromEmail: z.string().email("Invalid email address"),
  fromAddress: z.string().min(1, "From Address is required"),
  clientName: z.string().min(1, "Client Name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientAddress: z.string().min(1, "Client Address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNumber: z.number().positive("Invoice Number must be positive"),
  note: z.string().optional(),
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
  year: z.number().int().positive("Year must be a positive integer"),
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
