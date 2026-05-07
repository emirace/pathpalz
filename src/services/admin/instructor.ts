import { IInstructorCreatePayload } from "@/types/admin/instructor";
import apiClient from "../api";

export const getInstructors = async () => {
  const response = await apiClient.get("/instructor");
  return response.data;
};
export const addInstructor = async (data: IInstructorCreatePayload) => {
  const response = await apiClient.post("/instructor/register", data);
  return response.data;
};
