import apiClient from "../utils/apiclient";

export const addAnnouncementApi = async (courseId,announcementData) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `/teacher/courses/${courseId}/announcement`,
      data: announcementData,
    
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("adding content error ", error);
    throw error;
  }
};

export const getAnnouncementApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `/teacher/${teacherId}/announcement`,
      withCredentials:true,
    });

    console.log("announcement details", data); 


    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getAnnouncementsForStudentApi = async (level,faculty) => {
  console.log("faculty in api is",level,faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/student/announcement",
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