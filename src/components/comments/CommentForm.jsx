import { useState } from "react";
import { useUserContext } from "../../contexts/user";
import { usePostContext } from "../../contexts/post";
import { useCommentsContext } from "../../contexts/comments";
import Spinner from "../spinners/Spinner";
import CommentsServices from "../../api/comments";

export default function CommentForm() {
    const { user } = useUserContext();
    const { post } = usePostContext();
    const { setComments } = useCommentsContext();
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const commentsServices = CommentsServices();

    return (
        <form onSubmit={onSubmitHandler} className="w-full">
            <div className="flex items-center justify-center p-3 absolute bottom-0 left-0 w-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={user?.profilePicture}
                    className="rounded-full object-cover w-10 h-10"
                />
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full mx-3"
                    onChange={onChangeHandler}
                    value={newComment}
                />
                <button type="submit" className="btn btn-success">
                    {loading ? <Spinner /> : "Post"}
                </button>
            </div>
        </form>
    );

    function onChangeHandler(e) {
        const { value } = e.target;
        setNewComment(value);
    }

    async function onSubmitHandler(e) {
        try {
            e.preventDefault();
            if (!newComment.trim() || loading === true) {
                return;
            }
            setLoading(true);
            const response = await commentsServices.create(post._id, {
                text: newComment,
            });
            if (response.ok) {
                setComments((prev) => {
                    return [response.data, ...prev];
                });
            }
        } catch (err) {
            return;
        } finally {
            setLoading(false);
            setNewComment("");
        }
    }
}
