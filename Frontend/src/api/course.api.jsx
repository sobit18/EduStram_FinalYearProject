import apiClient from "../utils/apiclient";

export const getCoursesApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `/teacher/${teacherId}/courses`,
      withCredentials:true,
    });

    console.log("courses details", data); 


    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


export const getCoursesForStudentApi = async (level,faculty) => {
  console.log("faculty in api is",level,faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/student/courses",
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