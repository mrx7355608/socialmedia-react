import { axiosAgent } from "../utils/axiosAgent";

export function AuthServices() {
    const signup = async (data) => {
        const response = await axiosAgent.post("/api/v1/auth/signup", data);
        return response.data;
    };

    const logout = async () => {
        const response = await axiosAgent.post("/api/v1/auth/logout");
        return response.data;
    };

    const login = async (data) => {
        const response = await axiosAgent.post("/api/v1/auth/login", data);
        return response.data;
    };

    return { signup, logout, login };
}
