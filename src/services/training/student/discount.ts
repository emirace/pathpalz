import { trainingClient } from "@/services/api";
import { IGenerateDiscountCodePayload } from "@/types/discount";


export const generateDiscountCode = async (
    payload: IGenerateDiscountCodePayload
) => {
    const form = new FormData();
    form.append("discount_rule_id", payload.discount_rule_id);
    form.append("institution_name", payload.institution_name);
    form.append("institution_address", payload.institution_address);
    form.append("email", payload.email);
    form.append("student_id_card", payload.student_id_card);
    const res = await trainingClient.post("/student/generate/code", form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
