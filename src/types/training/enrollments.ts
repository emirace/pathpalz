export interface ICourseStructure {
  id: number;
  type: string;
  title: string;
  price: string;
  instructors: {
    id: number;
    description: string | null;
    user: {
      id: number;
      email: string;
      first_name: string | null;
      last_name: string | null;
    };
  }[];
  course_structure: {
    header_id: number;
    title: string;
    modules: {
      id: number;
      title: string;
    }[];
  }[];
}
export interface IEnrollment {
  enrollment_id: number;
  student: {
    id: number;
    email: string;
    first_name: string | null;
    last_name: string | null;
  };
  purchased_course: ICourseStructure;
  payment: {
    status: string;
    amount: string;
    currency: string;
    method: string;
    reference: string;
    gateway: {
      name: string;
      slug: string;
    };
  };
  order_status: string;
  created_at: string;
  purchased_at: string;
}
