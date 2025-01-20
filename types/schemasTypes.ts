import { z } from "zod";
import {
  AddressSchema,
  onBoardingSchema,
  UserSchema,
  ClientSchema,
  ServiceSchema,
  ServicesSchema,
  PaymentDetailsSchema,
  InvoiceSchema,
} from "@/schemas"; // Sostituisci con il path corretto
import { businessDetail, User } from "@prisma/client";

export type AddressType = z.infer<typeof AddressSchema>;
export type OnBoardingType = z.infer<typeof onBoardingSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type ClientType = z.infer<typeof ClientSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type ServicesType = z.infer<typeof ServicesSchema>;
export type PaymentDetailsType = z.infer<typeof PaymentDetailsSchema>;
export type InvoiceType = z.infer<typeof InvoiceSchema>;

export type ClientTypeWithId = ClientType & {
  id: string;
};

export type UserWithBusinessDetail = User & {
  businessDetail: businessDetail | null;
};
