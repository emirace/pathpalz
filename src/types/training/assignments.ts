export interface IAssignment {
    id: string;
    instructor_id: string;
    title: string;
    description: string;
    course_module_id: string;
    deadline: string;
    duration_minutes: string;
    pass_score: string;
    multiple_attempts: boolean;
    strict_deadline: boolean;
    attachments?: File[];
}

export interface ICreateAssignmentPayload {
    title: string;
    description: string;
    course_module_id: string;
    deadline: string;
    duration_minutes: string;
    pass_score: string;
    multiple_attempts: boolean;
    strict_deadline: boolean;
    attachments?: File[];
    status: string;
}

export interface ISubmission {
    id: string;
    assignment_id: string;
    student_id: number;
    submission_files: { file_path: string; file_name: string; file_size: number }[];
    submission_note: string;
    score?: string;
    feedback?: string;
    submitted_at: string;
    status: string;
    updated_at: string;
    created_at: string
}

export interface ISubmissionResponse {
    success: boolean;
    data: ISubmission
}