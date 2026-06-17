export interface IInstructorCreatePayload {
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  description: string;
  teachable_type: string;
  teachable_id: number;
}

export interface IInstructor {
  instructor_id: number;
  user: {
    first_name: string;
    last_name: string;
    id: number;
    email: string;
    phone_number: string | null;
    status: "active" | "inactive" | "suspended";
    external_id: string
  };
  description: string | null;
  assigned_course: {
    type: string;
    id: number;
    title: string;
  } | null;
}
