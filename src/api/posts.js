import { axiosAgent } from "../utils/axiosAgent";

export function PostServices() {
    const like = async (postID) => {
        const response = await axiosAgent.patch(
            `/api/v1/posts/like/${postID}`,
            null
        );
        return response.data;
    };

    const dislike = async (postID) => {
        const response = await axiosAgent.patch(
            `/api/v1/posts/dislike/${postID}`,
            null
        );
        return response.data;
    };
    return {
        like,
        dislike,
    };
}
