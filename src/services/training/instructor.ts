import { IInstructorProgressRequest, IInstructorProgressResponse } from "@/types/training/instructor";
import { trainingClient } from "../api";

export const updateInstructorProgress = async (data: IInstructorProgressRequest): Promise<IInstructorProgressResponse> => {
  const response = await trainingClient.post("/progress/instructor", data);
  return response.data;
};
