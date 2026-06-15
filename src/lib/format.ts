/** Formatteert een prijs (string of number) als "€1.234,56". */
export function formatPrice(price: string | number): string {
  const num = typeof price === "number" ? price : parseFloat(price);
  if (isNaN(num)) return String(price);
  return `€${num.toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
