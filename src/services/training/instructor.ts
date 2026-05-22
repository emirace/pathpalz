import {
  IInstructorProgressRequest,
  IInstructorProgressResponse,
  IInstructorModuleResponse,
  IAssignedTrack,
  IGetInstructorAssignedTracksResponse,
} from "@/types/training/instructor";
import { trainingClient } from "../api";

export const updateInstructorProgress = async (
  data: IInstructorProgressRequest,
): Promise<IInstructorProgressResponse> => {
  const response = await trainingClient.post("/progress/instructor", data);
  return response.data;
};

export const getInstructorProgress = async () => {
  const response = await trainingClient.get(`/instructor/progress`);
  return response.data;
};

export const getInstructorAssignedTracks = async (): Promise<
  IAssignedTrack[]
> => {
  const response = await trainingClient.get(`/instructor/my-assigns`);
  return response.data.data;
};

export const getTrackModules = async (
  trackId: number,
): Promise<IInstructorModuleResponse> => {
  const response = await trainingClient.get(`/tracks/${trackId}/modules`);
  return response.data;
};

export const getAllStudentAttendance = async () => {
  const response = await trainingClient.get(`/attendance/students`);
  return response.data;
};

export const getStudentAttendancePerModule = async (moduleId: number) => {
  const response = await trainingClient.get(`/attendance/modules/${moduleId}`);
  return response.data;
};

export const getStudentAttendance = async ({
  studentId,
}: {
  studentId: number;
}) => {
  const response = await trainingClient.get(
    `/instructor/students/${studentId}`,
  );
  return response.data;
};

export const updateStudentAttendance = async ({
  studentId,
  course_module_id,
  attendance,
}: {
  studentId: number;
  course_module_id: number;
  attendance: boolean;
}) => {
  const response = await trainingClient.post(
    `/instructor/attendance/students/${studentId}`,
    { course_module_id, attendance },
  );
  return response.data;
};
