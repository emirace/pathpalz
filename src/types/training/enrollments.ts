export interface IEnrollment {
  enrollment_id: number;
  user: {
    id: number;
    email: string;
    first_name: string | null;
    last_name: string | null;
  };
  training: {
    id: number;
    title: string;
    price: string;
    duration_weeks: number;
  };
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
}
