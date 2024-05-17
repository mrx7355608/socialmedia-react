import { axiosAgent } from "../utils/axiosAgent";

export default function CommentsServices() {
    const create = async (postID, data) => {
        const url = `/api/v1/comments/${postID}`;
        const response = await axiosAgent.post(url, data, {
            withCredentials: true,
        });
        return response.data;
    };

    return {
        create,
    };
}
