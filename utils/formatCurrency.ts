interface iAppProps {
  amount: number;
  currency: string;
}

export const formatCurrency = ({ amount, currency }: iAppProps) => {
  try {
    // Usa locale it-IT per la formattazione
    const locale = "it-IT";

    // Usa `Intl.NumberFormat` con `currencyDisplay: "symbol"` per ottenere il simbolo della valuta dinamicamente
    const formattedAmount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      currencyDisplay: "narrowSymbol", // Mostra il simbolo della valuta
    }).format(amount);

    return formattedAmount;
  } catch (error) {
    console.error("Error formatting currency:", error);
    return amount.toFixed(2); // Fallback a un formato base
  }
};
export function parseDynamicCurrency(
  value: string,
  currency: string = "EUR",
  locale: string = "it-IT"
): number {
  // Crea un formatter per ottenere simbolo e separatori
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  // Recupera separatori dal formatter
  const parts = formatter.formatToParts(1234.56);
  const decimalSeparator =
    parts.find((p) => p.type === "decimal")?.value || ",";
  const groupSeparator = parts.find((p) => p.type === "group")?.value || ".";

  // Rimuovi simboli della valuta e separatori di gruppo
  const sanitizedValue = value
    .replace(/[^\d,.-]/g, "") // Rimuovi simboli
    .replace(groupSeparator, "") // Rimuovi separatore delle migliaia
    .replace(decimalSeparator, "."); // Sostituisci separatore decimale

  // Converte in numero
  const numericValue = parseFloat(sanitizedValue);

  return isNaN(numericValue) ? 0 : numericValue;
}
