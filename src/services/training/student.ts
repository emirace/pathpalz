import {
  IModuleSession,
  IStudentAttendanceRequest,
  IStudentAttendanceResponse,
  IStudentModuleAttendanceResponse,
} from "@/types/training/student";
import { trainingClient } from "../api";

export const markAttendance = async (
  data: IStudentAttendanceRequest,
): Promise<IStudentAttendanceResponse> => {
  const response = await trainingClient.post("/mark", data);
  return response.data;
};

export const getModuleAttendance = async (
  moduleId: number,
): Promise<IStudentModuleAttendanceResponse> => {
  const response = await trainingClient.get(`/module/${moduleId}`);
  return response.data;
};

export const markCourseAsCompleted = async (module_title: string) => {
  const response = await trainingClient.post(`/training/progress/student`, {
    module_title,
  });
  return response.data;
};

export const getModuleSessions = async (
  moduleId: number,
): Promise<IModuleSession> => {
  const response = await trainingClient.get(
    `/student/module/${moduleId}/sessions`,
  );
  return response.data;
};
