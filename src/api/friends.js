import { axiosAgent } from "../utils/axiosAgent";

export default function FriendServices() {
    const remove = async (friendID) => {
        const response = await axiosAgent.patch(
            `/api/v1/friends/remove-friend/${friendID}`
        );
        return response.data;
    };

    const rejectRequest = async (requestID) => {
        const response = await axiosAgent.delete();
    };

    const acceptRequest = async (requestID) => {
        const response = await axiosAgent.patch(
            `/api/v1/friends/accept-request/${requestID}`
        );
        return response.data;
    };

    return {
        remove,
        rejectRequest,
        acceptRequest,
    };
}
