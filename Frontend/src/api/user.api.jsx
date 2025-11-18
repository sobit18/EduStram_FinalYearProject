import apiClient from "../utils/apiclient";

export const addUserApi = async ({
  fullName,
  email,
  password,
  faculty,
  course,
  level,
}) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/auth/register",
      data: {
        fullName,
        email,
        password,
        faculty,
        course,
        level,
        role: "student",
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Adding student failed:", error.message);
    throw error;
  }
};

export const loginApi = async (email, password) => {
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/auth/login",
      data: { email, password },
    });

    console.log("auth login response in api folder: ", data);

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getUserApi = async () => {
  try {
    const data = await apiClient.request({
      method: "GET",
      url: "/auth/getme",
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


export const getStudentByFacultyApi = async (faculty) => {
  console.log("faculty in api is",faculty)
  try {
    const data = await apiClient.request({
      method: "POST",
      url: "/teacher/students",
     data: { faculty },
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
