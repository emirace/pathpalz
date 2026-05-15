import {
  IInstructor,
  IInstructorCreatePayload,
} from "@/types/admin/instructor";
import apiClient, { trainingClient } from "../api";

export const getInstructors = async (): Promise<{
  data: IInstructor[];
  success: boolean;
}> => {
  const response = await trainingClient.get("/admin/instructors");
  return response.data;
};
export const addInstructor = async (data: IInstructorCreatePayload) => {
  const response = await apiClient.post("/instructor/register", data);
  return response.data;
};
