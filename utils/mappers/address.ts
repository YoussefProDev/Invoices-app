import { AddressType } from "@/types/schemasTypes";

export function addressMapper(address: AddressType): string {
  const { street, cap, comune, provincia } = address;
  // Formatta l'indirizzo italiano
  return `${street}, ${cap} ${comune} (${provincia.toUpperCase()})`;
}
export function addressParser(formattedAddress: string): AddressType {
  // Utilizza una regex per estrarre i campi dalla stringa formattata
  const regex = /^(.*),\s*(\d{5})\s*(.*)\s*\((.*)\)$/;
  const match = formattedAddress.match(regex);

  // Se non c'è match, ritorna un oggetto con tutti i campi vuoti
  if (!match) {
    return {
      street: "",
      cap: "",
      comune: "",
      provincia: "",
    };
  }

  // Estrai i campi dalla regex match
  const [, street, cap, comune, provincia] = match;

  // Ritorna l'oggetto con i campi estratti o stringhe vuote se mancano
  return {
    street: street || "",
    cap: cap || "",
    comune: comune || "",
    provincia: provincia ? provincia.toUpperCase() : "", // Mantieni la provincia in maiuscolo se presente
  };
}
