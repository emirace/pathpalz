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