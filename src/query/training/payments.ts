import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkout,
  getPaymentOptionBySlug,
  getPaymentOptions,
  verifyPayment,
} from "@/services/training/payments";
import {
  ICheckoutRequest,
  IVerifyPaymentRequest,
} from "@/types/training/payments";

export const useGetPaymentOptions = () => {
  return useQuery({
    queryKey: ["payment-options"],
    queryFn: getPaymentOptions,
  });
};

export const useGetPaymentOptionBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["payment-option", slug],
    queryFn: () => getPaymentOptionBySlug(slug),
    enabled: !!slug,
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: (data: ICheckoutRequest) =>
      checkout({
        ...data,
        success_url: `${window.location.origin}/training/success?payment_status=success`,
        cancel_url: `${window.location.origin}/training/success?payment_status=failed`,
      }),
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IVerifyPaymentRequest) => verifyPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};
