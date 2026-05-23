import { trainingClient } from "../api";

export const getStudents = async () => {
  const response = await trainingClient.get("/admin/students");
  return response.data;
};
