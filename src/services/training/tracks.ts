import { ITrack } from "@/types/training/tracks";
import { trainingClient } from "../api";

export const getTracks = async (): Promise<ITrack[]> => {
  const response = await trainingClient.get("/tracks");
  return response.data.data;
};

export const getTrackById = async (id: string | number): Promise<ITrack> => {
  const response = await trainingClient.get(`/tracks/${id}`);
  return response.data.data;
};
