import {
  ICheckoutRequest,
  ICheckoutResponse,
  IPaymentOption,
  IVerifyPaymentRequest,
} from "@/types/training/payments";
import { trainingClient } from "../api";

export const getPaymentOptions = async (): Promise<IPaymentOption[]> => {
  const response = await trainingClient.get("/payment/options");
  return response.data.data;
};

export const getPaymentOptionBySlug = async (
  slug: string,
): Promise<IPaymentOption> => {
  const response = await trainingClient.get(`/payment/options/${slug}`);
  return response.data.data;
};

export const checkout = async (
  data: ICheckoutRequest,
): Promise<ICheckoutResponse> => {
  const response = await trainingClient.post("/checkout", {
    ...data,
    success_url: "http://localhost:3000/training/success",
    cancel_url: "http://localhost:3000/training/cancel",
  });
  return response.data;
};

export const verifyPayment = async (
  data: IVerifyPaymentRequest,
): Promise<{ message: string }> => {
  const response = await trainingClient.post("/payment/verify", data);
  return response.data;
};
