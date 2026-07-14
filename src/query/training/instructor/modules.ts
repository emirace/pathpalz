import { getCourseOutline } from "@/services/training/instructor/modules";
import { useQuery } from "@tanstack/react-query";

export const useGetInstructorCourseOutline = () => {
  return useQuery({
    queryKey: ["course-outline"],
    queryFn: getCourseOutline,
    select: (data) => data.data,
  });
};
