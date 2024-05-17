import { axiosAgent } from "../utils/axiosAgent";

export default function UserServices() {
    const update = async (data) => {
        const response = await axiosAgent.patch("/api/v1/user", data);
        return response.data;
    };

    const sendFriendRequest = async (friendID) => {
        const url = `/api/v1/friends/send-request/${friendID}`;
        const response = await axiosAgent.post(url, null);
        return response.data;
    };

    return {
        update,
        sendFriendRequest,
    };
}
