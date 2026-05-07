import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createType,
  getTypeById,
  updateType,
  deleteType,
  getAllTypes,
  getTrackTypes,
} from "@/services/admin/types";
import { ITypeCreatePayload, ITypeUpdatePayload } from "@/types/admin/admin";

export const useGetAllTypes = () => {
  return useQuery({
    queryKey: ["admin-types"],
    queryFn: getAllTypes,
  });
};

export const useGetTypeById = (id: string | number) => {
  return useQuery({
    queryKey: ["admin-type", id],
    queryFn: () => getTypeById(id),
    enabled: !!id,
  });
};

export const useCreateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ITypeCreatePayload) => createType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-types"] });
    },
  });
};

export const useUpdateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: ITypeUpdatePayload;
    }) => updateType(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-types"] });
      queryClient.invalidateQueries({ queryKey: ["admin-type", variables.id] });
    },
  });
};

export const useDeleteType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-types"] });
    },
  });
};

export const useGetAllTrackTypes = ({ track_id }: { track_id: string }) => {
  return useQuery({
    queryKey: ["admin-types", track_id],
    queryFn: () => getTrackTypes({ track_id }),
    enabled: !!track_id,
  });
};
