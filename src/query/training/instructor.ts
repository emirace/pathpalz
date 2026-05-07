import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateInstructorProgress, getTrackModules } from "@/services/training/instructor";
import { IInstructorProgressRequest } from "@/types/training/instructor";

export const useUpdateInstructorProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IInstructorProgressRequest) => updateInstructorProgress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
};

export const useGetTrackModules = (trackId: number) => {
  return useQuery({
    queryKey: ["track-modules", trackId],
    queryFn: () => getTrackModules(trackId),
    enabled: !!trackId,
  });
};
