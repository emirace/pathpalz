import {
  getAssignmentsPerModule,
  getStudentAssignments,
  submitAssignment,
} from "@/services/training/student/assignments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetStudentAssignments = () => {
  return useQuery({
    queryKey: ["student-assignments"],
    queryFn: getStudentAssignments,
  });
};

export const useGetAssignmentsPerModule = ({
  moduleId,
}: {
  moduleId: string;
}) => {
  return useQuery({
    queryKey: ["student-assignments", moduleId],
    queryFn: () => getAssignmentsPerModule({ moduleId }),
    enabled: !!moduleId,
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitAssignment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["student-assignments", variables.assignmentId],
      });
    },
  });
};
