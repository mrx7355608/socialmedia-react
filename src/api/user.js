import { axiosAgent } from "../utils/axiosAgent";

export default function UserServices() {
    const update = async (data) => {
        const response = await axiosAgent.patch("/api/v1/user", data, {
            withCredentials: true,
        });
        return response.data;
    };

    const sendFriendRequest = async (friendID) => {
        const url = `/api/v1/friends/send-request/${friendID}`;
        const response = await axiosAgent.post(url, null, {
            withCredentials: true,
        });
        return response.data;
    };

    return {
        update,
        sendFriendRequest,
    };
}
