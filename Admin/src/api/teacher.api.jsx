import apiClient from "../utils/apiClient";

// import setTeacher from "../context/LearningContext"

export const addTeacherApi = async ({
  fullName,
  email,
  phone,
  faculty,
  course,
}) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/admin/teacher",
      data: {
        fullName,
        email,
        phone,
        faculty,
        course,
        role:'teacher',
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Adding teacher failed:", error.message);
    throw error;
  }
};

export const getTeacherApi = async () => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: "/admin/teachers",
      withCredentials: true,
    });

    //  setTeacher(data);
     console.log("teachers data",data)

    console.log("GETTEACHER API: ",data)

    return data;
  } catch (error) {
    console.error("getting teacher failed:", error.message);
    throw error;
  }
};

export const deleteTeacherApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "DELETE",
      url: `/admin/teacher/${teacherId}`,
      withCredentials: true,
    });

    console.log("GETTEACHER API: ",data)

    return data;
  } catch (error) {
    console.error("getting teacher failed:", error.message);
    throw error;
  }
};
export const updateTeacherApi = async (teacherId,formData) => {
  try {
    const data = await apiClient.request({
      method: "PUT",
      url: `/admin/teacher/${teacherId}`,
      data:formData,
      withCredentials: true,
    });

    console.log("GETTEACHER API: ",data)

    return data;
  } catch (error) {
    console.error("getting teacher failed:", error.message);
    throw error;
  }
};
