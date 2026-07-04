import {
  IModuleSession,
  IStudentAttendanceRequest,
  IStudentAttendanceResponse,
  IStudentModuleAttendanceResponse,
  IStudentModuleProgressByIdResponse,
  IStudentModuleProgressResponse,
} from "@/types/training/student";
import { trainingClient } from "../../api";

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

export const markCourseAsCompleted = async ({
  module_title,
  course_module_id,
}: {
  module_title: string;
  course_module_id: number;
}) => {
  const response = await trainingClient.post(`/progress/student`, {
    module_title,
    course_module_id,
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

export const getStudentModuleProgress = async ({
  type_id,
  sub_type_id,
  track_id,
  course_module_id,
}: {
  type_id?: number;
  sub_type_id?: number;
  track_id?: number;
  course_module_id?: number;
}): Promise<IStudentModuleProgressResponse> => {
  const response = await trainingClient.get(`/student/module/progress`, {
    params: {
      type_id,
      sub_type_id,
      track_id,
      course_module_id,
    },
  });
  return response.data;
};

export const getStudentModuleProgressById = async (
  moduleId: number,
): Promise<IStudentModuleProgressByIdResponse> => {
  const response = await trainingClient.get(
    `/modules/${moduleId}/completed-students`,
  );
  return response.data;
};
