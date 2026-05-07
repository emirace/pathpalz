import { trainingClient } from "../api";
import { ITrack } from "@/types/training/tracks";
import {
  IApiResponse,
  IAdminTrackCreatePayload,
  IAdminTrackUpdatePayload,
} from "@/types/admin/admin";

export const createTrainingTrack = async (
  data: IAdminTrackCreatePayload,
): Promise<IApiResponse<ITrack>> => {
  const response = await trainingClient.post("/admin/training-tracks", data);
  return response.data;
};

export const updateTrainingTrack = async (
  slug: string,
  data: IAdminTrackUpdatePayload,
): Promise<IApiResponse<ITrack>> => {
  const response = await trainingClient.patch(
    `/admin/training-tracks/${slug}`,
    data,
  );
  return response.data;
};

export const deleteTrainingTrack = async (
  slug: string,
): Promise<IApiResponse<{ message: string }>> => {
  const response = await trainingClient.delete(
    `/admin/training-tracks/${slug}`,
  );
  return response.data;
};
