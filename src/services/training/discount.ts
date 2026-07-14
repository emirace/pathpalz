import { IDiscountRuleResponse } from "@/types/discount";
import { trainingClient } from "../api";

export const getDiscountRule = async (
  code: string,
): Promise<IDiscountRuleResponse> => {
  const response = await trainingClient.get(`/discount/code/with/rule/${code}`);
  return response.data;
};
