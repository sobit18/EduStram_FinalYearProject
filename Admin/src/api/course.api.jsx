import apiClient from "../utils/apiClient";

export const addCourseApi = async ({
  teacherId,
  level,
  faculty,
  subject,
  duration,
  chapters,
}) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `/admin/teacher/${teacherId}/course`,
      data: {
        teacherId,
        level,
        faculty,
        subject,
        duration,
        chapters,
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("adding course error ",error)
    
    // console.error("Adding course failed:", error.message);
    throw error;
  }
};


export const getCourseApi = async () => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: "/admin/courses",
      withCredentials: true,
    });

    console.log("GETcourses API: ",data)

    return data;
  } catch (error) {
    console.error("getting courses failed:", error.message);
    throw error;
  }
};

export const deleteCourseApi = async (courseId) => {
  try {
    const data = await apiClient.request({
      method: "DELETE",
      url: `/admin/courses/${courseId}`,
      withCredentials: true,
    });

    console.log("GETCourseAPI: ",data)

    return data;
  } catch (error) {
    console.error("deleting coursefailed:", error.message);
    throw error;
  }
};

export const updateCourseApi = async (courseId,formData) => {
  try {
    const data = await apiClient.request({
      method: "PUT",
      url: `/admin/courses/${courseId}`,
      data:formData,
      withCredentials: true,
    });

    console.log("updatecourseAPI: ",data)

    return data;
  } catch (error) {
    console.error("getting course failed:", error.message);
    throw error;
  }
};

