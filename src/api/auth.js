import { axiosAgent } from "../utils/axiosAgent";

export function AuthServices() {
    const signup = async (data) => {
        const response = await axiosAgent.post("/api/v1/auth/signup", data, {
            withCredentials: true,
        });
        return response.data;
    };
    return { signup };
}
