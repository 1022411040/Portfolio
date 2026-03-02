import axios from "axios";
import SummaryApi, { baseUrl } from "./SummaryApi";

// Base Axios instance for all API calls
const ApiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // future-proof if refresh token moves to cookies
});

// Attach access token to every request
ApiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: refresh access token on 401
ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuth
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        clearAuthAndRedirect();
        return Promise.reject(error);
      }

      try {
        const { url, method } = SummaryApi.adminRefresh;

        // IMPORTANT: use plain axios, not ApiClient (avoid infinite loop)
        const res = await axios({
          baseURL: baseUrl,
          url,
          method,
          data: { refreshToken },
          withCredentials: true,
        });

        const newAccessToken = res.data?.data?.accessToken;
        const newRefreshToken = res.data?.data?.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("Invalid refresh response");
        }

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiClient(originalRequest);
      } catch (refreshErr) {
        clearAuthAndRedirect();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

function clearAuthAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

export default ApiClient;
