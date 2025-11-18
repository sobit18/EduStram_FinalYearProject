import apiClient from "../utils/apiclient";

export const addAssignmentApi = async (courseId,assignmentData) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `/teacher/courses/${courseId}/assignment`,
      data: assignmentData,
    
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("adding content error ", error);
    throw error;
  }
};

export const getAssignmentApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `/teacher/${teacherId}/assignment`,
      withCredentials:true,
    });

    console.log("assignment details", data); 


    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getAssignmentsForStudentApi = async (level,faculty) => {
  console.log("faculty in api is",level,faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/student/assignment",
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