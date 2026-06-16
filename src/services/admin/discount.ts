import { ICreateDiscountReponse, ICreateDiscountRequest } from "@/types/discount"
import { trainingClient } from "../api"

export const createDiscount = async (data: ICreateDiscountRequest): Promise<ICreateDiscountReponse> => {
    const response = await trainingClient.post("/admin/set/discounts", data)
    return response.data
}

export const updateDiscount = async ({ data, discountId }: { data: ICreateDiscountRequest, discountId: string }): Promise<ICreateDiscountReponse> => {
    const response = await trainingClient.patch(`/admin/update/discounts/${discountId}`, data)
    return response.data
}

export const deleteDiscount = async (discountId: string): Promise<{ message: string }> => {
    const response = await trainingClient.delete(`/admin/delete/discounts/${discountId}`)
    return response.data
}

export const getDiscount = async (discountId: string): Promise<{ message: string }> => {
    const response = await trainingClient.get(`/admin/discounts/by/${discountId}`)
    return response.data
}

export const getAllDiscounts = async (): Promise<{ message: string }> => {
    const response = await trainingClient.get(`/all/discounts`)
    return response.data
}