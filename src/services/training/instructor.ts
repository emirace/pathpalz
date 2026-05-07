import {
  IInstructorProgressRequest,
  IInstructorProgressResponse,
  IInstructorModuleResponse,
} from "@/types/training/instructor";
import { trainingClient } from "../api";

export const updateInstructorProgress = async (
  data: IInstructorProgressRequest
): Promise<IInstructorProgressResponse> => {
  const response = await trainingClient.post("/progress/instructor", data);
  return response.data;
};

export const getTrackModules = async (
  trackId: number
): Promise<IInstructorModuleResponse> => {
  const response = await trainingClient.get(`/tracks/${trackId}/modules`);
  return response.data;
};
