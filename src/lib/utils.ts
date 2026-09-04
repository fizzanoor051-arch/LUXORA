export function cn(
  ...classes: Array<string | false | null | undefined>
) {
  return classes.filter(Boolean).join(" ");
}

export function generateId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
}

export function calculateDiscount(
  price: number,
  oldPrice?: number
): number {
  if (!oldPrice || oldPrice <= price) {
    return 0;
  }

  return Math.round(
    ((oldPrice - price) / oldPrice) * 100
  );
}

export function calculateTax(
  amount: number,
  taxRate = 0.05
): number {
  return amount * taxRate;
}

export function calculateShipping(
  subtotal: number,
  freeShippingThreshold = 75,
  shippingFee = 10
): number {
  return subtotal >= freeShippingThreshold
    ? 0
    : shippingFee;
}

export function truncateText(
  text: string,
  maxLength: number
): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
}