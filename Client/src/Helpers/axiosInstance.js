import axios from "axios";

const BASE_URL = "https://lms-full-stack-783y.vercel.app/";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
