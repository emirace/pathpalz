import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  markAttendance,
  getModuleAttendance,
  markCourseAsCompleted,
  getModuleSessions,
} from "@/services/training/student";
import { IStudentAttendanceRequest } from "@/types/training/student";

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IStudentAttendanceRequest) => markAttendance(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["module-attendance", variables.course_module_id],
      });
    },
  });
};

export const useGetModuleAttendance = (moduleId: number) => {
  return useQuery({
    queryKey: ["module-attendance", moduleId],
    queryFn: () => getModuleAttendance(moduleId),
    enabled: !!moduleId,
  });
};

export const useMarkCourseAsCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markCourseAsCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module-attendance"] });
    },
  });
};

export const useGetModuleSessions = (moduleId: number) => {
  return useQuery({
    queryKey: ["module-sessions", moduleId],
    queryFn: () => getModuleSessions(moduleId),
    enabled: !!moduleId,
  });
};
