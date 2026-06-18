import { trainingClient } from "@/services/api";
import {
  IAssignment,
  ICreateAssignmentPayload,
  ISubmission,
} from "@/types/training/assignments";

export const getInstructorAssignments = async (): Promise<{
  success: boolean;
  count: number;
  data: IAssignment[];
}> => {
  const response = await trainingClient.get(
    `/instructor/fetch/all/assignments`,
  );
  return response.data;
};

export const createAssignment = async (data: ICreateAssignmentPayload) => {
  const formData = new FormData();

  const { attachments, ...fields } = data;

  // Append scalar fields
  for (const [key, value] of Object.entries(fields) as [string, any][]) {
    if (value === undefined || value === null) continue;
    // Booleans must be sent as "1"/"0" for most PHP/Laravel backends
    if (typeof value === "boolean") {
      formData.append(key, value ? "1" : "0");
    } else {
      formData.append(key, String(value));
    }
  }

  // Append each attachment file individually
  if (attachments && attachments.length > 0) {
    for (let i = 0; i < attachments.length; i++) {
      formData.append(`attachments[${i}]`, attachments[i]);
    }
  }

  const response = await trainingClient.post(`/assignments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getInstructorAssignmentsPerModule = async ({
  moduleId,
}: {
  moduleId: string;
}): Promise<{ success: boolean; data: IAssignment[] }> => {
  const response = await trainingClient.get(`/assignments/${moduleId}`);
  return response.data;
};

export const getAssignmentSubmissions = async ({
  assignmentId,
}: {
  assignmentId: string;
}): Promise<{ success: boolean; data: ISubmission[] }> => {
  const response = await trainingClient.get(
    `/assignments/${assignmentId}/submissions`,
  );
  return response.data;
};

export const gradeSubmission = async ({
  submissionId,
  data,
}: {
  submissionId: string;
  data: { score: string; feedback: string; status: string };
}) => {
  const response = await trainingClient.patch(
    `/submissions/${submissionId}/grade`,
    data,
  );
  return response.data;
};
