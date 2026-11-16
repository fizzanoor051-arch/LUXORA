export type PaymentMethod =
  | "cod"
  | "card"
  | "wallet";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded";

export interface Payment {
  id: string;
  orderId: string;

  amount: number;
  currency: string;

  method: PaymentMethod;
  status: PaymentStatus;

  transactionId?: string;

  createdAt: string;
  updatedAt?: string;
}

export interface CreatePaymentData {
  orderId: string;
  amount: number;
  method: PaymentMethod;
}

export interface PaymentResponse {
  success: boolean;
  message: string;

  payment?: Payment;

  checkoutUrl?: string;
}