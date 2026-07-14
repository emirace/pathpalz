import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWaitingList, joinWaitingList, notifyUserOfWaitingList, submitEnquiry } from "@/services/training/enquiry";
import { IEnquiryRequest } from "@/types/training/enquiry";

export const useSubmitEnquiry = () => {
  return useMutation({
    mutationFn: (data: IEnquiryRequest) => submitEnquiry(data),
  });
};


export const useJoinWaitingList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinWaitingList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waiting-list"] });
    },
  });
};

export const useFetchWaitingList = () => {
  return useQuery({
    queryKey: ["waiting-list"],
    queryFn: fetchWaitingList,
    select: data => data.data
  });
};

export const useNotifyUserOfWaitingList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notifyUserOfWaitingList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waiting-list"] });
    },
  });
};