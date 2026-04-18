import axios from "axios";

export const authService = "https://auth.pathpalz.com/api";

const apiClient = axios.create({
  baseURL: authService,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const OriginalRequest = error.config;
    if (error.response?.status === 401 && !OriginalRequest._retry) {
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

export default apiClient;
