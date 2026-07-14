import { trainingClient } from "../api";
import {
  IApiResponse,
  IType,
  ITypeCreatePayload,
  ITypeUpdatePayload,
} from "@/types/admin/admin";

export const createType = async (
  data: ITypeCreatePayload,
): Promise<IApiResponse<IType>> => {
  const response = await trainingClient.post("/admin/types", data);
  return response.data;
};

export const getTypeById = async (
  id: number | string,
): Promise<IApiResponse<IType>> => {
  const response = await trainingClient.get(`/admin/types/${id}`);
  return response.data;
};

export const updateType = async (
  id: number | string,
  data: ITypeUpdatePayload,
): Promise<IApiResponse<IType>> => {
  const response = await trainingClient.patch(`/admin/types/${id}`, data);
  return response.data;
};

export const deleteType = async (
  id: number | string,
): Promise<IApiResponse<{ message: string }>> => {
  const response = await trainingClient.delete(`/admin/types/${id}`);
  return response.data;
};

export const getAllTypes = async (): Promise<IApiResponse<IType[]>> => {
  const response = await trainingClient.get("/types");
  return response.data;
};

export const getTrackTypes = async ({
  track_id,
}: {
  track_id: string;
}): Promise<IApiResponse<IType[]>> => {
  const response = await trainingClient.get(`/types/track/${track_id}`);
  return response.data;
};
