import {
  IInstructorProgressRequest,
  IInstructorProgressResponse,
  IInstructorModuleResponse,
  IAssignedTrack,
} from "@/types/training/instructor";
import { trainingClient } from "../api";

export const updateInstructorProgress = async (
  data: IInstructorProgressRequest,
): Promise<IInstructorProgressResponse> => {
  const formData = new FormData();
  const dataEntries = Object.entries(data) as [string, any][];
  for (const [key, value] of dataEntries) {
    formData.append(key, value);
  }
  const response = await trainingClient.post(
    "/progress/instructor",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
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
  const response = await trainingClient.patch(
    `/instructor/attendance/students/${studentId}`,
    { course_module_id, attended: attendance },
  );
  return response.data;
};

export const getTypeModules = async ({ typeId }: { typeId: number }) => {
  const response = await trainingClient.get(`/types/${typeId}/modules`);
  return response.data;
};

export const getSubTypeModules = async ({
  subTypeId,
}: {
  subTypeId: number;
}) => {
  const response = await trainingClient.get(`/sub-types/${subTypeId}/modules`);
  return response.data;
};
