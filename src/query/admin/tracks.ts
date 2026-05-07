import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTrainingTrack,
  updateTrainingTrack,
  deleteTrainingTrack,
} from "@/services/admin/tracks";
import {
  IAdminTrackCreatePayload,
  IAdminTrackUpdatePayload,
} from "@/types/admin/admin";

export const useCreateTrainingTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrainingTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
};

export const useUpdateTrainingTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string;
      data: IAdminTrackUpdatePayload;
    }) => updateTrainingTrack(slug, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      queryClient.invalidateQueries({ queryKey: ["track", variables.slug] });
    },
  });
};

export const useDeleteTrainingTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => deleteTrainingTrack(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
};
