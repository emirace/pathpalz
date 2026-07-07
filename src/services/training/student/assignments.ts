import { trainingClient } from "@/services/api";
import { IAssignment, ISubmissionResponse } from "@/types/training/assignments";

export const getStudentAssignments = async ({
  purchasable_type,
}: {
  purchasable_type: string;
}): Promise<{
  success: boolean;
  data: IAssignment[];
}> => {
  const response = await trainingClient.get("/student/all/assignments", {
    params: { purchasable_type },
  });
  return response.data;
};

export const getAssignmentsPerModule = async ({
  moduleId,
}: {
  moduleId: string;
}): Promise<{ success: boolean; data: IAssignment[] }> => {
  const response = await trainingClient.get(`/modules/${moduleId}/assignments`);
  return response.data;
};

export const submitAssignment = async ({
  assignmentId,
  data,
}: {
  assignmentId: string;
  data: { submission_note: string; files: File[] };
}): Promise<ISubmissionResponse> => {
  const formData = new FormData();
  for (let i = 0; i < data.files.length; i++) {
    const file = data.files[i];
    if (file instanceof File) {
      formData.append(`files[${i}]`, file);
    }
  }
  formData.append("submission_note", data.submission_note);
  const response = await trainingClient.post(
    `/assignments/${assignmentId}/submit`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};
export const getStudentAssignmentsPermodule = async ({
  courseModuleHeaderId,
}: {
  courseModuleHeaderId: string;
}) => {
  const response = await trainingClient.get(
    `/student/assignments/${courseModuleHeaderId}`,
  );
  return response.data;
};
