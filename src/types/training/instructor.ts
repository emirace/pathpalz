export interface IInstructorProgressRequest {
  module_title: string;
  course_video_url: string;
  instructor_marked?: string;
}

export interface IInstructorProgressResponse {
  message: string;
  data: {
    id: number;
    user_id: number;
    course_video_url: string;
    student_completed: number;
    instructor_marked: string;
    completed_at: string;
    module_title: string;
    created_at: string;
    updated_at: string;
  };
}
