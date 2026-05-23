import { IEnrollment } from "@/types/training/enrollments";
import { trainingClient } from "../api";

export const getPayments = async (): Promise<IEnrollment[]> => {
  const response = await trainingClient.get("/admin/payments");
  return response.data;
};
