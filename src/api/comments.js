import { axiosAgent } from "../utils/axiosAgent";

export default function CommentsServices() {
    const create = async (postID, data) => {
        const url = `/api/v1/comments/${postID}`;
        const response = await axiosAgent.post(url, data);
        return response.data;
    };

    const edit = async (commentID) => {
        const url = `/api/v1/comments/${commentID}`;
        const response = await axiosAgent.patch(url);
        return response.data;
    };

    const remove = async (commentID) => {
        const url = `/api/v1/comments/${commentID}`;
        await axiosAgent.delete(url);
        return null;
    };

    return {
        create,
        edit,
        remove,
    };
}
