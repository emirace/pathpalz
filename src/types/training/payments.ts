export interface IPaymentOption {
  id: number;
  slug: string;
  name: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICheckoutRequest {
  track_id: number;
  gateway: "stripe" | "paystack";
  email?: string;
  full_name?: string;
  success_url?: string;
  cancel_url?: string;
}

export interface ICheckoutResponse {
  checkout_url: string;
}

export interface IVerifyPaymentRequest {
  reference: string;
}
