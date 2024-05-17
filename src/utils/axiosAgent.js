import axios from "axios";

export const axiosAgent = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    // Axios will not throw error for status code below 400
    validateStatus: (statusCode) => statusCode < 500,
    withCredentials: true,
});
