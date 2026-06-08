import { fetchIPInfo } from "@/services/location";
import { useQuery } from "@tanstack/react-query";

export const useFetchIP = () => {
  return useQuery({
    queryKey: ["ipinfo"],
    queryFn: () => fetchIPInfo(),
  });
};
