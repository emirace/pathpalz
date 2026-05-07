import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourseModuleHeader,
  getCourseModuleHeaderById,
  updateCourseModuleHeader,
  getAllCourseModuleHeaders,
} from "@/services/admin/course-module-headers";
import {
  ICourseModuleHeaderCreatePayload,
  ICourseModuleHeaderUpdatePayload,
} from "@/types/admin";

export const useGetAllCourseModuleHeaders = () => {
  return useQuery({
    queryKey: ["admin-course-module-headers"],
    queryFn: getAllCourseModuleHeaders,
  });
};

export const useGetCourseModuleHeaderById = (id: string | number) => {
  return useQuery({
    queryKey: ["admin-course-module-header", id],
    queryFn: () => getCourseModuleHeaderById(id),
    enabled: !!id,
  });
};

export const useCreateCourseModuleHeader = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICourseModuleHeaderCreatePayload) =>
      createCourseModuleHeader(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-course-module-headers"],
      });
    },
  });
};

export const useUpdateCourseModuleHeader = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: ICourseModuleHeaderUpdatePayload;
    }) => updateCourseModuleHeader(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-course-module-headers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-course-module-header", variables.id],
      });
    },
  });
};
