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
