import { useMutation } from "@tanstack/react-query"
import { generateDiscountCode } from "@/services/training/student/discount"


export const useGenerateDiscountCode = () => {
    return useMutation({
        mutationFn: generateDiscountCode,
    })
}