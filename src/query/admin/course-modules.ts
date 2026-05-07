import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourseModule,
  getCourseModuleById,
  updateCourseModule,
  getAllCourseModules,
} from "@/services/admin/course-modules";
import {
  ICourseModuleCreatePayload,
  ICourseModuleUpdatePayload,
} from "@/types/admin/admin";

export const useGetAllCourseModules = () => {
  return useQuery({
    queryKey: ["admin-course-modules"],
    queryFn: getAllCourseModules,
  });
};

export const useGetCourseModuleById = (id: string | number) => {
  return useQuery({
    queryKey: ["admin-course-module", id],
    queryFn: () => getCourseModuleById(id),
    enabled: !!id,
  });
};

export const useCreateCourseModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICourseModuleCreatePayload) => createCourseModule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-course-modules"] });
    },
  });
};

export const useUpdateCourseModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: ICourseModuleUpdatePayload;
    }) => updateCourseModule(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-course-modules"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-course-module", variables.id],
      });
    },
  });
};
