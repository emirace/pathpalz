import axios from "axios";

export const authService = "https://auth.pathpalz.com/api";
export const trainingServiceUrl = "https://elearning.pathpalz.com/api/training";

const setupInterceptors = (instance: any) => {
  instance.interceptors.request.use(
    (config: any) => {
      if (typeof window !== "undefined") {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      const OriginalRequest = error.config;
      if (error.response?.status === 401 && !OriginalRequest._retry && typeof window !== "undefined") {
        OriginalRequest._retry = true;
        const refresh_token = localStorage.getItem("refreshToken");
        if (refresh_token) {
          try {
            const response = await axios.post(`${authService}/refresh-token`, {
              refresh_token,
            });
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("refreshToken", response.data.refresh_token);
            OriginalRequest.headers["Authorization"] =
              `Bearer ${response.data.token}`;
            return axios(OriginalRequest);
          } catch (error) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            console.log(error, "catch error in refresh service");
          }
        }
      }
      return Promise.reject(error);
    },
  );
};

const apiClient = axios.create({
  baseURL: authService,
  headers: {
    "Content-Type": "application/json",
  },
});

export const trainingClient = axios.create({
  baseURL: trainingServiceUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(apiClient);
setupInterceptors(trainingClient);

export default apiClient;
