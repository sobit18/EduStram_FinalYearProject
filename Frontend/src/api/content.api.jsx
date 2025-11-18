import apiClient from "../utils/apiclient";

export const addContentApi = async (formData, courseId) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `/teacher/courses/${courseId}/content`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Important
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("adding content error ", error);
    throw error;
  }
};

export const getContentApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `/teacher/${teacherId}/contents`,
      withCredentials:true,
    });

    console.log("contents details", data); 


    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getContentsForStudentApi = async (level,faculty) => {
  console.log("faculty in api is",level,faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/student/contents",
     data: { level,faculty },
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


export const getContentsByCourseIdApi = async (courseId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `/courses/${courseId}/contents`,
    //  data: { level,faculty },
      withCredentials: true,
    });


    //setTeacher(data)
    console.log("GETUSER API: ",data)

    return data;
  } catch (error) {


    
    console.error("Error fetching contents:", error);
    throw error;
  }
};