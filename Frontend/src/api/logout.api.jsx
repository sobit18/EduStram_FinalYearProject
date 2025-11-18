import apiClient from "../utils/apiclient";

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