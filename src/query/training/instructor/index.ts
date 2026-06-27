import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateInstructorProgress,
  getTrackModules,
  updateStudentAttendance,
  getAllStudentAttendance,
  getStudentAttendance,
  getStudentAttendancePerModule,
  getInstructorProgress,
  getInstructorAssignedTracks,
  getTypeModules,
  getSubTypeModules,
  getAssignmentAnalytics,
} from "@/services/training/instructor";
import { IInstructorProgressRequest } from "@/types/training/instructor";

export const useUpdateInstructorProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IInstructorProgressRequest) =>
      updateInstructorProgress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-progress"] });
    },
  });
};

export const useGetInstructorProgress = () => {
  return useQuery({
    queryKey: ["instructor-progress"],
    queryFn: getInstructorProgress,
  });
};

export const useGetInstructorAssignedTracks = () => {
  return useQuery({
    queryKey: ["instructor-assigned-tracks"],
    queryFn: getInstructorAssignedTracks,
  });
};

export const useGetTrackModules = (trackId: number) => {
  return useQuery({
    queryKey: ["track-modules", trackId],
    queryFn: () => getTrackModules(trackId),
    enabled: !!trackId,
  });
};

export const useGetAllStudentAttendance = () => {
  return useQuery({
    queryKey: ["all-student-attendance"],
    queryFn: getAllStudentAttendance,
  });
};

export const useGetStudentAttendancePerModule = (moduleId: number) => {
  return useQuery({
    queryKey: ["student-attendance-per-module", moduleId],
    queryFn: () => getStudentAttendancePerModule(moduleId),
    enabled: !!moduleId,
  });
};

export const useGetStudentAttendance = (studentId: number) => {
  return useQuery({
    queryKey: ["student-attendance", studentId],
    queryFn: () => getStudentAttendance({ studentId }),
    enabled: !!studentId,
  });
};

export const useUpdateStudentAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudentAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-student-attendance"] });
      queryClient.invalidateQueries({ queryKey: ["student-attendance"] });
    },
  });
};

export const useGetTypeModules = (typeId: number) => {
  return useQuery({
    queryKey: ["type-modules", typeId],
    queryFn: () => getTypeModules({ typeId }),
    enabled: !!typeId,
    select: (response) => response.data,
  });
};

export const useGetSubTypeModules = (subTypeId: number) => {
  return useQuery({
    queryKey: ["sub-type-modules", subTypeId],
    queryFn: () => getSubTypeModules({ subTypeId }),
    enabled: !!subTypeId,
    select: (response) => response.data,
  });
};


export const useGetAssignmentAnalytics = () => {
  return useQuery({
    queryKey: ["assignment-analytics"],
    queryFn: getAssignmentAnalytics,
    select: (response) => response.data,
  });
};