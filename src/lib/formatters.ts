export function formatCurrency(
  amount: number,
  currency = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(
  date: string | Date
): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatShortDate(
  date: string | Date
): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatNumber(
  number: number
): string {
  return new Intl.NumberFormat("en-US").format(
    number
  );
}

export function formatPercentage(
  value: number
): string {
  return `${value.toFixed(0)}%`;
}

export function formatOrderId(
  id: string
): string {
  return id.startsWith("#") ? id : `#${id}`;
}