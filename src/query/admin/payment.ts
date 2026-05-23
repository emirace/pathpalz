import { getPayments } from "@/services/admin/payment";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["admin-payments"],
    queryFn: getPayments,
  });
};
