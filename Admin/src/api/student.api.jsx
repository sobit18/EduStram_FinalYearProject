import apiClient from "../utils/apiClient";

export const getStudentApi = async () => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: "/admin/users",
      withCredentials: true,
    });


    //setTeacher(data)
    console.log("GETUSER API: ",data)

    return data;
  } catch (error) {
    console.error("getting user failed:", error.message);
    throw error;
  }
};

export const deleteStudentApi = async (studentId) => {
  try {
    const data = await apiClient.request({
      method: "DELETE",
      url: `/admin/user/${studentId}`,
      withCredentials: true,
    });

    console.log("DELETE API: ",data)

    return data;
  } catch (error) {
    console.error("getting student failed:", error.message);
    throw error;
  }
};