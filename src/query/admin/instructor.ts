import { addInstructor, getInstructors } from "@/services/admin/instructor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetInstructors = () => {
  return useQuery({
    queryKey: ["instructor"],
    queryFn: getInstructors,
  });
};

export const useAddInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addInstructor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor"] });
    },
  });
};
