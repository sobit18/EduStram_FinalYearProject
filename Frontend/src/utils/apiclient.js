import axios from "axios";

class ApiClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
      },
      timeout: 15000,
      withCredentials: true, // 15 seconds timeout
    });

    this.initializeInterceptors();
  }

  initializeInterceptors() {
    // Request Interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response) => response?.data,
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message =
            error.response?.data?.data?.message || "An error occurred";

          if (import.meta.env.VITE_MODE === "development") {
            console.error(`API Error (${status}): ${message}`);
          }

          throw new Error(message);
        }

        throw new Error("Unexpected error occurred");
      }
    );
  }

  getToken() {
    return localStorage.getItem("accessToken") || null;
  }

  async request(config) {
    try {
      const response = await this.client.request(config);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}

const apiClient = new ApiClient(
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000/api"
);

export default apiClient;
