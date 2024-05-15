import { axiosAgent } from "../utils/axiosAgent";

export default function UserServices() {
    const update = async (data) => {
        const response = await axiosAgent.patch("/api/v1/user", data, {
            withCredentials: true,
        });
        return response.data;
    };

    return {
        update,
    };
}
