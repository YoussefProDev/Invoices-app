import { z } from "zod";

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

export const ServiceSchema = z.object({
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
    .positive(
      "IVA rate must be a positive number. Please provide a valid rate."
    ),
  nature: z
    .string()
    .min(1, "Nature is required. Please provide the nature of the service."),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  totalPrice: z
    .number()
    .positive(
      "Total price must be a positive number. Please provide a valid total."
    ),
});

export const ServicesSchema = ServiceSchema.array();

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

export const InvoiceSchema = z.object({
  client: ClientSchema,
  invoiceType: z.enum(
    [
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
    ],
    {
      errorMap: () => ({
        message:
          "Invalid Invoice Type. Please provide a valid type from the predefined list.",
      }),
    }
  ),
  regimeFiscale: z.enum(
    [
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
    ],
    {
      errorMap: () => ({
        message:
          "Invalid Regime Fiscale. Please select a valid fiscal regime from the list.",
      }),
    }
  ),
  invoiceNumber: z.string().regex(/^\d+$/, {
    message: "Invoice Number must be a positive integer.",
  }),
  date: z.date(),
  status: z.enum(["PAID", "PENDING"]),
  services: ServicesSchema.optional(),
  note: z.string().max(500, "Note must not exceed 500 characters.").optional(),
});
