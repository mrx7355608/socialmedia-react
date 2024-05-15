import axios from "axios";

export const axiosAgent = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
