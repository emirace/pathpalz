export interface IInstructorCreatePayload {
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  description: string;
  teachable_type: string;
  teachable_id: number;
}
