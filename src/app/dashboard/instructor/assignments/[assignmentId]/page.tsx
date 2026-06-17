import AssignmentDetailsClient from "../../../../../components/training/instructor/AssignmentDetailsClient";
import { getInstructorAssignments } from "@/services/training/instructor/assignments";

export async function generateStaticParams() {
  try {
    const res = await getInstructorAssignments();
    const list = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
        ? res
        : [];
    return list.map((a: any) => ({ assignmentId: String(a.id) }));
  } catch (error) {
    console.error(
      "Failed to fetch assignments for generateStaticParam:",
      error,
    );
    return [{ assignmentId: "mock-1" }];
  }
}

export default function AssignmentDetailsPage() {
  return <AssignmentDetailsClient />;
}
