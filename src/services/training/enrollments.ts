import { IEnrollment } from "@/types/training/enrollments";
import { trainingClient } from "../api";

export const getMyEnrollments = async (): Promise<IEnrollment[]> => {
  const response = await trainingClient.get("/my-enrollments");
  return response.data.data;
};

export const getEnrollmentById = async (id: string | number): Promise<IEnrollment> => {
  const response = await trainingClient.get(`/my-enrollment-details/${id}`);
  return response.data.data;
};
