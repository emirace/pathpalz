import { IStudent } from "@/types/training/student";
import { trainingClient } from "../api";

export const getStudents = async (): Promise<{
  data: IStudent[];
  success: boolean;
}> => {
  const response = await trainingClient.get("/admin/students");
  return response.data;
};
