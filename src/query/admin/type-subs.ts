import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubType,
  getSubTypeById,
  updateSubType,
  getAllSubTypes,
  getTypeSubTypes,
} from "@/services/admin/type-subs";
import {
  ISubTypeCreatePayload,
  ISubTypeUpdatePayload,
} from "@/types/admin/admin";

export const useGetAllSubTypes = () => {
  return useQuery({
    queryKey: ["admin-type-subs"],
    queryFn: getAllSubTypes,
  });
};

export const useGetSubTypeById = (id: string | number) => {
  return useQuery({
    queryKey: ["admin-type-sub", id],
    queryFn: () => getSubTypeById(id),
    enabled: !!id,
  });
};

export const useCreateSubType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ISubTypeCreatePayload) => createSubType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-type-subs"] });
    },
  });
};

export const useUpdateSubType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: ISubTypeUpdatePayload;
    }) => updateSubType(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-type-subs"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-type-sub", variables.id],
      });
    },
  });
};

export const useGetTypeSubTypes = ({ type_id }: { type_id: string }) => {
  return useQuery({
    queryKey: ["admin-type-subs", type_id],
    queryFn: () => getTypeSubTypes({ type_id }),
    enabled: !!type_id,
  });
};
