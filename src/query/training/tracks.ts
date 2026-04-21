import { useQuery } from "@tanstack/react-query";
import { getTrackById, getTracks } from "@/services/training/tracks";

export const useGetTracks = () => {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });
};

export const useGetTrackById = (id: string | number) => {
  return useQuery({
    queryKey: ["track", id],
    queryFn: () => getTrackById(id),
    enabled: !!id,
  });
};
