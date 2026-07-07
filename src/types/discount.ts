export const DISCOUNT_TYPES = {
  school_based: "school_based",
  individual_student: "individual_student",
  general: "general",
} as const;

export type IDiscountType =
  (typeof DISCOUNT_TYPES)[keyof typeof DISCOUNT_TYPES];

export interface ICreateDiscountRequest {
  name: string;
  percentage: number;
  is_active: boolean;
  is_student: boolean;
  discount_type: IDiscountType;
  min_students?: number;
  max_students?: number;
  max_years_after_graduation?: number;
}

export interface ICreateDiscountReponse {
  id: number;
  name: string;
  percentage: number;
  is_active: boolean;
  is_student: boolean;
  discount_type: IDiscountType;
  min_students?: number;
  max_students?: number;
  max_years_after_graduation?: number;
  created_at: string;
  updated_at: string;
}

export interface IGenerateDiscountCodePayload {
  discount_rule_id: string;
  institution_name: string;
  institution_address: string;
  email: string;
  student_id_card?: File;
  beneficiary_emails?: string[];
}

export const DISCOUNT_TYPE_LABELS: Record<IDiscountType, string> = {
  school_based: "School-Based (Teacher)",
  individual_student: "Individual Student",
  general: "General / Promo",
};

export interface IDiscountCodeResponse {
  current_page: number;
  data: {
    id: number;
    discount_rule_id: number;
    user_id: number;
    order_id?: number;
    code: string;
    is_student: boolean;
    is_used: boolean;
    used_at?: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
    institution_name: string;
    institution_address: string;
    student_id_card: string;
    email: string;
    beneficiary_emails: string;
    user: {
      id: number;
      external_id: string;
      email: string;
      first_name: string;
      last_name: string;
      usertype: string[];
      created_at: string;
      updated_at: string;
    };
    discount_rule: {
      id: number;
      name: string;
      percentage: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
      is_student: boolean;
      max_students: string;
      discount_type: string;
      min_students: string;
      max_years_after_graduation: string;
    };
  }[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    page: string;
    active: boolean;
  }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface IDiscountRuleResponse {
  message: string;
  data: {
    code: string;
    email: string;
    is_used: boolean;
    rule: ICreateDiscountReponse;
  };
}
