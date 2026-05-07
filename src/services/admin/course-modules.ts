import { trainingClient } from "../api";
import {
  IApiResponse,
  ICourseModule,
  ICourseModuleCreatePayload,
  ICourseModuleUpdatePayload,
} from "@/types/admin/admin";

export const createCourseModule = async (
  data: ICourseModuleCreatePayload,
): Promise<IApiResponse<ICourseModule>> => {
  const response = await trainingClient.post("/admin/course-modules", data);
  return response.data;
};

export const getCourseModuleById = async (
  id: number | string,
): Promise<IApiResponse<ICourseModule>> => {
  const response = await trainingClient.get(`/admin/course-modules/${id}`);
  return response.data;
};

export const updateCourseModule = async (
  id: number | string,
  data: ICourseModuleUpdatePayload,
): Promise<IApiResponse<ICourseModule>> => {
  const response = await trainingClient.patch(
    `/admin/course-modules/${id}`,
    data,
  );
  return response.data;
};

export const getAllCourseModules = async (): Promise<
  IApiResponse<ICourseModule[]>
> => {
  const response = await trainingClient.get("/admin/course-modules");
  return response.data;
};
