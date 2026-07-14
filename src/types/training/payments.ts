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
  item_type: "training_track" | "type" | "sub_type";
  item_id: number;
  gateway: "stripe" | "paystack";
  priceType: "price_ngn" | "price_gbp"
  email?: string;
  full_name?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  state?: string;
  street?: string;
  house_number?: string;
  apartment_number?: string;
  success_url?: string;
  cancel_url?: string;
}

export interface ICheckoutResponse {
  checkout_url: string;
}

export interface IVerifyPaymentRequest {
  reference: string;
}
