import apiClient from "../utils/apiclient";

export const addQuizApi = async (courseId,quizData) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `/teacher/courses/${courseId}/quiz`,
      data: quizData,  
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("adding content error ", error);
    throw error;
  }
};

export const getQuizApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `/teacher/${teacherId}/quiz`,
      withCredentials:true,
    });

    console.log("quizzes details", data); 


    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getQuizByIdApi = async (quizId) => {
  try {
    const res = await apiClient.request({
      method: "GET",
      url: `/teacher/quiz/${quizId}`,
      withCredentials:true,
    });

    console.log("quizzes details",res); 


    return res;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getQuizForStudentApi = async (level,faculty) => {
  console.log("faculty in api is",level,faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/student/quiz",
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

export const getQuizByIdForStudentApi = async (quizId) => {
  try {
    const res = await apiClient.request({
      method: "GET",
      url: `/student/quiz/${quizId}`,
      withCredentials:true,
    });

    console.log("quizzes details",res); 


    return res;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};