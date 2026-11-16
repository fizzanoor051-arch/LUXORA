import { api } from "./api";

export interface PaymentData {
  orderId: string;
  paymentMethod: "cod" | "card" | "wallet";
  amount: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  checkoutUrl?: string;
}

export const paymentService = {
  async createPayment(
    data: PaymentData
  ): Promise<PaymentResponse> {
    return api.post<PaymentResponse>(
      "/payments/create",
      data
    );
  },

  async verifyPayment(
    transactionId: string
  ): Promise<PaymentResponse> {
    return api.post<PaymentResponse>(
      "/payments/verify",
      {
        transactionId,
      }
    );
  },

  async getPaymentStatus(
    orderId: string
  ): Promise<PaymentResponse> {
    return api.get<PaymentResponse>(
      `/payments/${orderId}/status`
    );
  },
};