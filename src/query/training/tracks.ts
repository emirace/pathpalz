import { useQuery } from "@tanstack/react-query";
import { getTrackById, getTracks } from "@/services/training/tracks";
import { ITrack } from "@/types/training/tracks";

export const useGetTracks = () => {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
    select: (data) => {
      // Handle API shapes: either an array or an object with a `data` array
      const list: ITrack[] = Array.isArray(data)
        ? data
        : ((data as any)?.data ?? []);
      return list.slice().sort((a: any, b: any) => {
        const aDate = new Date(a?.created_at ?? a?.created_at ?? 0).getTime();
        const bDate = new Date(b?.created_at ?? b?.created_at ?? 0).getTime();
        return aDate - bDate;
      });
    },
  });
};

export const useGetTrackById = (id: string | number) => {
  return useQuery({
    queryKey: ["track", id],
    queryFn: () => getTrackById(id),
    enabled: !!id,
  });
};
