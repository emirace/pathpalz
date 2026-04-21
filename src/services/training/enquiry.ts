import { IEnquiryRequest, IEnquiryResponse } from "@/types/training/enquiry";
import { trainingClient } from "../api";

export const submitEnquiry = async (data: IEnquiryRequest): Promise<IEnquiryResponse> => {
  const response = await trainingClient.post("/enquiry", data);
  return response.data;
};
