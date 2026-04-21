import { useMutation } from "@tanstack/react-query";
import { submitEnquiry } from "@/services/training/enquiry";
import { IEnquiryRequest } from "@/types/training/enquiry";

export const useSubmitEnquiry = () => {
  return useMutation({
    mutationFn: (data: IEnquiryRequest) => submitEnquiry(data),
  });
};
