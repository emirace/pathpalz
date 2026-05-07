import { trainingClient } from "../api";
import {
  IApiResponse,
  ISubType,
  ISubTypeCreatePayload,
  ISubTypeUpdatePayload,
} from "@/types/admin/admin";

export const createSubType = async (
  data: ISubTypeCreatePayload,
): Promise<IApiResponse<ISubType>> => {
  const response = await trainingClient.post("/admin/type-subs", data);
  return response.data;
};

export const getSubTypeById = async (
  id: number | string,
): Promise<IApiResponse<ISubType>> => {
  const response = await trainingClient.get(`/admin/type-subs/${id}`);
  return response.data;
};

export const updateSubType = async (
  id: number | string,
  data: ISubTypeUpdatePayload,
): Promise<IApiResponse<ISubType>> => {
  const response = await trainingClient.patch(`/admin/type-subs/${id}`, data);
  return response.data;
};

export const getAllSubTypes = async (): Promise<IApiResponse<ISubType[]>> => {
  const response = await trainingClient.get("/admin/type-subs");
  return response.data;
};

export const getTypeSubTypes = async ({
  type_id,
}: {
  type_id: string;
}): Promise<IApiResponse<ISubType[]>> => {
  const response = await trainingClient.get(`/type-subs/track/${type_id}`);
  return response.data;
};
