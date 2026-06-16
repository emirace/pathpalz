import { trainingClient } from "@/services/api";
import { IAssignment, ICreateAssignmentPayload, ISubmission } from "@/types/training/assignments";

export const createAssignment = async (data: ICreateAssignmentPayload) => {
    const formData = new FormData();
    const dataEntries = Object.entries(data) as [string, any][];
    for (const [key, value] of dataEntries) {
        formData.append(key, value);
    }
    const response = await trainingClient.post(`/assignments`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const getInstructorAssignmentsPerModule = async ({ moduleId }: { moduleId: string }): Promise<{ success: boolean; data: IAssignment[] }> => {
    const response = await trainingClient.get(`/assignments/${moduleId}`);
    return response.data
}

export const getAssignmentSubmissions = async ({ assignmentId }: { assignmentId: string }): Promise<{ success: boolean; data: ISubmission[] }> => {
    const response = await trainingClient.get(`/assignments/${assignmentId}/submissions`);
    return response.data;
};

export const gradeSubmission = async ({
    submissionId,
    data
}: {
    submissionId: string,
    data: { score: string, feedback: string, status: string }
}) => {
    const response = await trainingClient.patch(`/submissions/${submissionId}/grade`, data)
    return response.data
}