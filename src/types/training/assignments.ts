import { ICourseModule } from "../admin/admin";

export interface IAssignment {
  id: number;
  instructor_id: number;
  title: string;
  description: string;
  course_module_id: string;
  deadline: string;
  duration_minutes: number;
  pass_score: number;
  multiple_attempts: boolean;
  strict_deadline: boolean;
  attachments?: {
    file_name: string;
    file_path: string;
    file_url: string;
    file_size: number;
    uploaded_at: string;
  }[];
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  submissions_count: number;
  my_submission?: ISubmission;
  submission_state: "not_submitted";
  submissions: ISubmission[];
  module?: ICourseModule;
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
  submission_files: {
    file_path: string;
    file_name: string;
    file_size: number;
    file_url: string;
  }[];
  submission_note: string;
  score?: string;
  feedback?: string;
  submitted_at: string;
  status: string;
  updated_at: string;
  created_at: string;
  student: {
    id: number;
    external_id: string;
    email: string;
    first_name: string;
    last_name: string;
    usertype: string[];
    created_at: string;
    updated_at: string;
  };
}

export interface ISubmissionResponse {
  success: boolean;
  data: ISubmission;
}
