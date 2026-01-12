import axios from "axios";
import { VITE_API_URL } from "@/config/config";

const baseURL = VITE_API_URL.endsWith('/') 
  ? VITE_API_URL + "api/" 
  : VITE_API_URL + "/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const startUser = async () => {
  try {
    const response = await axiosInstance.get("users/");
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post("users/register/", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("users/login/", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const logoutUser = async () => {
  try {
    const response = await axiosInstance.get("users/logout/");
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

export { startUser, registerUser, loginUser, logoutUser };
