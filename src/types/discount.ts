export interface ICreateDiscountRequest {
    name: string;
    percentage: number;

}

export interface ICreateDiscountReponse {
    id: number;
    name: string;
    percentage: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface IGenerateDiscountCodePayload {
    discount_rule_id: string;
    institution_name: string;
    institution_address: string;
    student_id_card: File;
    email: string
}