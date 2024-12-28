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
