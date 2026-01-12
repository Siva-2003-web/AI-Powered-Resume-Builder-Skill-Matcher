import axios from "axios";
import { VITE_API_URL } from "@/config/config";

const axiosInstance = axios.create({
  baseURL: VITE_API_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const createNewResume = async (data) => {
  try {
    const response = await axiosInstance.post(
      "resumes/createResume",
      data.data
    );
    return response.data;
  } catch (error) {
    // console.log("Eroor in getting all the resumes ",error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const getAllResumeData = async () => {
  try {
    const response = await axiosInstance.get("resumes/getAllResume");
    return response.data;
  } catch (error) {
    // console.log("Eroor in getting all the resumes ",error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const getResumeData = async (resumeID) => {
  try {
    // Check if this is a demo resume
    if (resumeID && resumeID.toString().startsWith('demo-')) {
      // Fetch all demo resumes and find the specific one
      const demoResponse = await axiosInstance.get("resumes/getDemoResumes");
      const demoResume = demoResponse.data.data.find(resume => resume._id === resumeID);
      
      if (!demoResume) {
        throw new Error("Demo resume not found");
      }
      
      return { data: demoResume, statusCode: 200, message: "Demo resume fetched successfully" };
    }
    
    // Regular resume fetch
    const response = await axiosInstance.get(
      `resumes/getResume?id=${resumeID}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const updateThisResume = async (resumeID, data) => {
  try {
    const response = await axiosInstance.put(
      `resumes/updateResume?id=${resumeID}`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const deleteThisResume = async (resumeID) => {
  try {
    const response = await axiosInstance.delete(
      `resumes/removeResume?id=${resumeID}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const getDemoResumes = async () => {
  try {
    const response = await axiosInstance.get("resumes/getDemoResumes");
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

export {
  getAllResumeData,
  deleteThisResume,
  getResumeData,
  updateThisResume,
  createNewResume,
  getDemoResumes,
};
