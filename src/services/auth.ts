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
