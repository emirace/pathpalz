import {
  getAssignmentsPerModule,
  getStudentAssignments,
  getStudentAssignmentsPermodule,
  submitAssignment,
} from "@/services/training/student/assignments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetStudentAssignments = (purchasable_type?: string) => {
  return useQuery({
    queryKey: ["student-assignments", purchasable_type],
    queryFn: () =>
      getStudentAssignments({ purchasable_type: purchasable_type || "" }),
    // enabled: !!purchasable_type,
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

export const useGetStudentAssignmentsPermodule = ({
  courseModuleHeaderId,
}: {
  courseModuleHeaderId?: string;
}) => {
  return useQuery({
    queryKey: ["student-assignments-per-module", courseModuleHeaderId],
    queryFn: () =>
      getStudentAssignmentsPermodule({
        courseModuleHeaderId: courseModuleHeaderId || "",
      }),
    enabled: !!courseModuleHeaderId,
    select: (data) => data.data, // Select only the 'data' property from the response
  });
};
