import { IEnquiryRequest, IEnquiryResponse, IGetWaitingList, IJoinWaitingListRequest, IJoinWaitingListResponse } from "@/types/training/enquiry";
import { trainingClient } from "../api";

export const submitEnquiry = async (data: IEnquiryRequest): Promise<IEnquiryResponse> => {
  const response = await trainingClient.post("/enquiry", data);
  return response.data;
};

export const joinWaitingList = async (data: IJoinWaitingListRequest): Promise<IJoinWaitingListResponse> => {
  const response = await trainingClient.post("/waiting-list", data);
  return response.data;
};

export const fetchWaitingList = async (): Promise<IGetWaitingList> => {
  const response = await trainingClient.get("/admin/waiting-lists");
  return response.data;
};

export const notifyUserOfWaitingList = async (id: string): Promise<{ message: string, success: boolean, total_notified: number }> => {
  const response = await trainingClient.post(`/admin/waiting-lists/notify/${id}`);
  return response.data;
};