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

    const create = async (data) => {
        const response = await axiosAgent.post("/api/v1/posts", data);
        return response.data;
    };

    const edit = async (postID, data) => {
        const response = await axiosAgent.patch(
            `/api/v1/posts/${postID}`,
            data
        );
        return response.data;
    };

    const remove = async (postID) => {
        const response = await axiosAgent.delete(
            `/api/v1/posts/${postID}`,
            null
        );
        return response ? response.data : null;
    };

    return {
        like,
        dislike,
        create,
        edit,
        remove,
    };
}
