import { trainingClient } from "../api";
import {
  IApiResponse,
  ICourseModuleHeader,
  ICourseModuleHeaderCreatePayload,
  ICourseModuleHeaderUpdatePayload,
} from "@/types/admin/admin";

export const createCourseModuleHeader = async (
  data: ICourseModuleHeaderCreatePayload,
): Promise<IApiResponse<ICourseModuleHeader>> => {
  const response = await trainingClient.post(
    "/admin/course-module-headers",
    data,
  );
  return response.data;
};

export const getCourseModuleHeaderById = async (
  id: number | string,
): Promise<IApiResponse<ICourseModuleHeader>> => {
  const response = await trainingClient.get(
    `/admin/course-module-headers/${id}`,
  );
  return response.data;
};

export const updateCourseModuleHeader = async (
  id: number | string,
  data: ICourseModuleHeaderUpdatePayload,
): Promise<IApiResponse<ICourseModuleHeader>> => {
  const response = await trainingClient.patch(
    `/admin/course-module-headers/${id}`,
    data,
  );
  return response.data;
};

export const getAllCourseModuleHeaders = async (): Promise<
  IApiResponse<ICourseModuleHeader[]>
> => {
  const response = await trainingClient.get("/admin/course-module-headers");
  return response.data;
};
