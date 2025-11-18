import apiClient from "../utils/apiClient";

export const logout = async () => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/auth/logout",
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};