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

export const updateInstructorStatus = async ({
  instructorId,
  status,
}: {
  instructorId: string;
  status: "active" | "inactive" | "suspended";
}) => {
  const response = await apiClient.post(`/admin/status`, {
    user_id: instructorId,
    status,
  });
  return response.data;
};
