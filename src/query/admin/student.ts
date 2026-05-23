import { getStudents } from "@/services/admin/student";
import { useQuery } from "@tanstack/react-query";

export const useGetStudents = () => {
  return useQuery({
    queryKey: ["admin-students"],
    queryFn: getStudents,
  });
};
