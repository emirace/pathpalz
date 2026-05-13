export interface IInstructorProgressRequest {
  course_module_id: number;
  sub_type_id?: number;
  type_id?: number;
  training_date: string;
  meeting_link?: string;
  recorded_link?: string;
  instructor_marked?: string;
}

export interface IInstructorProgressResponse {
  message: string;
  module: {
    id: number;
    training_track_id: number;
    type_id: number;
    sub_type_id: number;
    course_module_header_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    track?: any;
  };
  progress: {
    id: number;
    user_id: number;
    training_track_id: number;
    course_module_id: number;
    module_title: string;
    course_video_url: string | null;
    student_completed: any;
    instructor_marked: string;
    update_status_datetime: any[];
    completed_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface IInstructorModuleResponse {
  message: string;
  training_track: {
    id: number;
    title: string;
    description: string;
  };
  modules: Array<{
    id: number;
    training_track_id: number;
    type_id: number;
    sub_type_id: number;
    course_module_header_id: number;
    title: string;
    created_at: string;
    updated_at: string;
  }>;
}
