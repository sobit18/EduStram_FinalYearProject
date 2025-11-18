import apiClient from "../utils/apiClient";

export const login = async (email, password) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/admin/login",
      data: { email, password },
    });

    console.log("Data for login admin is: ", data);

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: "/admin/check-auth",
    });

    console.log("checkAuth data : ", data);

    return data;
  } catch (error) {
    console.error("Auth check failed:", error.message);
    throw error;
  }
};
