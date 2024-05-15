import { axiosAgent } from "../utils/axiosAgent";

export async function signup(data) {
    const response = await axiosAgent.post("/api/v1/auth/signup", data, {
        withCredentials: true,
    });
    return response.data;
}
