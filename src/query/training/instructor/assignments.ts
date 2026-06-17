import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAssignment,
  getAssignmentSubmissions,
  getInstructorAssignments,
  getInstructorAssignmentsPerModule,
  gradeSubmission,
} from "@/services/training/instructor/assignments";

export const useGetInstructorAssignment = () => {
  return useQuery({
    queryKey: ["instructor-assignments"],
    queryFn: () => getInstructorAssignments(),
  });
};
export const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-assignments"] });
    },
  });
};

export const useInstructorGetAssignmentsPerModule = ({ moduleId }: { moduleId: string }) => {
  return useQuery({
    queryKey: ["instructor-assignments", moduleId],
    queryFn: () => getInstructorAssignmentsPerModule({ moduleId }),
    enabled: !!moduleId,
    select: data => data?.data
  });
};


export const useGetAssignmentSubmissions = ({
  assignmentId
}: {
  assignmentId: string
}) => {
  return useQuery({
    queryKey: ["assignment-submissions", assignmentId],
    queryFn: () => getAssignmentSubmissions({ assignmentId }),
    select: data => data.data
  });
};

export const useGradeSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gradeSubmission,
    onSuccess: (_data, variables) => {
      const submissionId = variables.submissionId;
      queryClient.invalidateQueries({ queryKey: ["assignment-submissions", submissionId] });
    }
  })
}