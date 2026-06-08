export interface IStudentAttendanceRequest {
  course_module_id: number;
  attended: boolean;
}

export interface IStudent {
  id: number;
  external_id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  roles: string[];
  joined_at: string;
}

export interface IStudentAttendanceResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    course_module_id: number;
    user_id: number;
    attended: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface IStudentModuleAttendanceResponse {
  success: boolean;
  total_students: number;
  module: {
    id: number;
    training_track_id: number;
    type_id: number;
    sub_type_id: number;
    course_module_header_id: number;
    title: string;
    created_at: string;
    updated_at: string;
  };
  attendance: Array<{
    id: number;
    course_module_id: number;
    user_id: number;
    attended: boolean;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      external_id: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
      usertype: string[];
      created_at: string;
      updated_at: string;
    };
    module: unknown;
  }>;
}

export interface IModuleSession {
  success: boolean;
  module: {
    id: number;
    title: string;
  };
  sessions: Array<{
    training_date: string;
    meeting_link: string | null;
    recorded_link: string | null;
    status: string;
    updated_at: string;
    lesson_note: string | null;
  }>;
  lesson_notes: {
    file_name: string;
    file_url: string;
    file_size: number;
    uploaded_at: string;
  }[];
}
