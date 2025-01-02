import { AddressType } from "@/types/schemasTypes";

export function addressMapper(address: AddressType): string {
  const { street, cap, comune, provincia } = address;

  // Controllo di validità base (opzionale)
  //   const validatedFields = AddressSchema.safeParse(address);

  //   if (!validatedFields.success) {
  //     return {
  //       error: "Tutti i campi dell'indirizzo devono essere presenti.",
  //       //   details: validatedFields.error.format(),
  //     };
  //   }

  // Formatta l'indirizzo italiano
  return `${street}, ${cap} ${comune} (${provincia.toUpperCase()})`;
}
