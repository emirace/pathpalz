import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInstructorProgress } from "@/services/training/instructor";
import { IInstructorProgressRequest } from "@/types/training/instructor";

export const useUpdateInstructorProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IInstructorProgressRequest) => updateInstructorProgress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};
