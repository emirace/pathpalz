import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  markAttendance,
  getModuleAttendance,
  markCourseAsCompleted,
  getModuleSessions,
  getStudentModuleProgress,
  getStudentModuleProgressById,
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

export const useGetStudentProgress = (data: {
  type_id?: number;
  sub_type_id?: number;
  track_id?: number;
  course_module_id?: number;
}) => {
  return useQuery({
    queryKey: ["student-progress", data],
    queryFn: () => getStudentModuleProgress(data),
  });
};

export const useGetStudentProgressByModuleId = (course_module_id: number) => {
  return useQuery({
    queryKey: ["student-progress", course_module_id],
    queryFn: () => getStudentModuleProgressById(course_module_id),
    enabled: !!course_module_id,
    select: (data) => {
      return data.data;
    },
  });
};
