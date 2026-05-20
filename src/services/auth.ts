import { ILoginFormData, IRegisterFormData } from "@/types/auth";
import apiClient from "./api";

export const login = async (data: ILoginFormData) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const response = await apiClient.post("/login/otp", data);
  return response.data;
};

export const register = async (data: IRegisterFormData) => {
  const response = await apiClient.post("/register", data);
  return response.data.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await apiClient.post("/forgot-password", data);
  return response.data;
};

export const resetPassword = async (data: {
  confirmPassword: string;
  password: string;
  token: string;
}) => {
  const response = await apiClient.post("/reset-password", data);
  return response.data;
};

export const getUser = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return null;
    }
    const response = await apiClient.get(`/user-details`);
    return response.data.user;
  } catch (error) {
    return null;
  }
};

export const updateProfile = async (profileData: any): Promise<any> => {
  const response = await apiClient.post(`/user/profile`, profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
