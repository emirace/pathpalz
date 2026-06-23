import { toast } from "sonner";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    if (err.response?.data?.message) return err.response.data.message;
    if (err.message) return err.message;
  }
  return fallback;
}

export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast.warning(message),
};
