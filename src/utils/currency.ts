export const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    NGN: "₦",
  };
  return symbols[currencyCode] || currencyCode;
};
