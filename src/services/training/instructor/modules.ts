import { trainingClient } from "@/services/api";
import { ICourseStructure } from "@/types/training/enrollments";

export const getCourseOutline = async (): Promise<{ success: boolean, message: string, data: { assignmentId: string, course: ICourseStructure }[] }> => {
  const response = await trainingClient.get(`/instructor/course-outline`);
  return response.data;
};
