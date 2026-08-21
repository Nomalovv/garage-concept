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

const monthFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
});

// Formate une valeur d'input `type="month"` (ex. "2020-03") en "Mars 2020".
export function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return monthFormatter.format(new Date(year, month - 1, 1));
}
