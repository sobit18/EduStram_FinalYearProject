import apiClient from "../utils/apiClient";

export const CreateScheduleApi = async ({
  teacherId,
  level,
  faculty,
  subject,
  startTime,
  endTime,
}) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: `/admin/teacher/${teacherId}/schedule`,
      data: {
        teacherId,
        level,
        faculty,
        subject,
        startTime,
        endTime,
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("adding schedule error ",error)
    
    // console.error("Adding course failed:", error.message);
    throw error;
  }

};

  export const getScheduleApi = async () => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: "/admin/schedules",
      withCredentials: true,
    });

    console.log("GETschedule API: ",data)

    return data;
  } catch (error) {
    console.error("getting schedule failed:", error.message);
    throw error;
  }
};

export const deleteScheduleApi = async (scheduleId) => {
  try {
    const data = await apiClient.request({
      method: "DELETE",
      url: `/admin/schedules/${scheduleId}`,
      withCredentials: true,
    });

    console.log("GETScheduleAPI: ",data)

    return data;
  } catch (error) {
    console.error("deleting schedulefailed:", error.message);
    throw error;
  }
};

export const updateScheduleApi = async (scheduleId,formData) => {
  try {
    const data = await apiClient.request({
      method: "PUT",
      url: `/admin/schedules/${scheduleId}`,
      data:formData,
      withCredentials: true,
    });

    console.log("updatescheduleAPI: ",data)

    return data;
  } catch (error) {
    console.error("getting schedule failed:", error.message);
    throw error;
  }
};