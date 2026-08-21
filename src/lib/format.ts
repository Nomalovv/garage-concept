const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("fr-FR");

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

export function formatMileage(value: number): string {
  return `${numberFormatter.format(value)} km`;
}
