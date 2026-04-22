import { useQuery } from "@tanstack/react-query";
import { getMyEnrollments } from "@/services/training/enrollments";

export const useGetMyEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getMyEnrollments,
  });
};
