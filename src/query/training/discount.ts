import { getDiscountRule } from "@/services/training/discount";
import { useQuery } from "@tanstack/react-query";

export const useGetDiscountCodeRule = (code: string) => {
  return useQuery({
    queryKey: ["discount-rule", code],
    queryFn: async () => getDiscountRule(code),
    enabled: !!code,
    select: (data) => data.data,
  });
};
