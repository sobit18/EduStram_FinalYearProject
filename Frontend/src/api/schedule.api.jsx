import apiClient from "../utils/apiclient";

export const getSchedulesApi = async (teacherId) => {
  try {
    console.log("Testing api before api call");

    const res = await apiClient.request({
      method: "GET",
      url: `/teacher/${teacherId}/schedules`,
      withCredentials: true,
    });

    console.log("Testing api after api call");
    console.log("Schedule details:", res); // res is already the payload

    return res; // just return res, it's already your schedules data
  } catch (error) {
    console.error("Fetching schedules failed:", error);
    throw error;
  }
};

export const getSchedulesForStudentApi = async (level,faculty) => {
  console.log("faculty in api is",level,faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/student/schedules",
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
