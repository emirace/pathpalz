import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, login, register, verifyOtp, forgotPassword, resetPassword, updateProfile } from "@/services/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: {
      email?: string;
      tel_code: string;
      phone_number?: string;
      password?: string;
      password_confirmation?: string;
    }) => register({ ...data, service: "lms", usertype: ["user"] }),
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
};
