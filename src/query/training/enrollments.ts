import { useQuery } from "@tanstack/react-query";
import {
  getEnrollmentById,
  getMyEnrollments,
} from "@/services/training/enrollments";

export const useGetMyEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getMyEnrollments,
  });
};

export const useGetEnrollmentById = (id: string | number) => {
  return useQuery({
    queryKey: ["enrollment", id],
    queryFn: () => getEnrollmentById(id),
    enabled: !!id,
  });
};
