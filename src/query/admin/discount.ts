import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  getDiscount,
  getDiscountCode,
  getDiscountCodes,
  updateDiscount,
} from "@/services/admin/discount";

export const useGetDiscounts = () => {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: () => getAllDiscounts(),
  });
};
export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
};

export const useGetDiscountById = (discountId: string) => {
  return useQuery({
    queryKey: ["discount", discountId],
    queryFn: () => getDiscount(discountId),
    enabled: !!discountId,
  });
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
};

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
};

export const useGetDiscountCodes = () => {
  return useQuery({
    queryKey: ["discount-codes"],
    queryFn: () => getDiscountCodes(),
    select: (data) => data.data,
  });
};

export const useGetDiscountCodeById = (discountId: string) => {
  return useQuery({
    queryKey: ["discount-code", discountId],
    queryFn: () => getDiscountCode(discountId),
    enabled: !!discountId,
  });
};
