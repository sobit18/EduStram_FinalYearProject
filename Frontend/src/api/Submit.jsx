import apiClient from "../utils/apiclient";

export const submitAssignmentApi = async (formData) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `student/submitassignment`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Important for file uploads
      },
      withCredentials: true, // if your backend uses cookies/session
    });

    return data;
  } catch (error) {
    console.log("Submit assignment error:", error);
    throw error;
  }
};

export const getSubmissionsApi = async (studentId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `student/submissions/${studentId}`,
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Fetch submissions error:", error);
    throw error;
  }
};

export const getSubmissionsByTeacherIdApi = async (teacherId) => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: `teacher/studentsubmission/${teacherId}`,
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Fetch submissions error:", error);
    throw error;
  }
};

export const updateSubmissionApi = async (submissionId, grade, feedback) => {
  try {
     const data = await apiClient.request({
      method: "PUT",
      url: `teacher/submission/${submissionId}`,
      data: { grade, feedback },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error updating submission:", error);
    throw error;
  }
};

// export const updateSubmissionApi = async (submissionId, grade, feedback) => {
//   try {
//     const data = await apiClient.put(`/teacher/submission/${submissionId}`, { grade, feedback });
//     return data;
//   } catch (error) {
//     console.error("Error updating submission:", error);
//     throw error;
//   }
// };