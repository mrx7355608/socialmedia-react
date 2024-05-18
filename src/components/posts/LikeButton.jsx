import { useState } from "react";
import { usePostContext } from "../../contexts/post";
import { useUserContext } from "../../contexts/user";
import { ErrorToast } from "../toasts";
import { PostServices } from "../../api/posts";
import { BiLike, BiSolidLike } from "react-icons/bi";
import Spinner from "../spinners/Spinner";

export default function LikeButton() {
    const { post, setPost } = usePostContext();
    const { user } = useUserContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        like: false,
        dislike: false,
    });
    const postServices = PostServices();

    return (
        <>
            {isLikedPost() ? (
                <button
                    className="btn btn-info btn-outline flex-1"
                    onClick={dislikePost}
                >
                    <BiSolidLike size={20} />
                    {loading.dislike ? <Spinner /> : "Liked"}
                </button>
            ) : (
                <button
                    className="btn btn-ghost flex-1"
                    onClick={onClickHandler}
                >
                    <BiLike size={20} />
                    {loading.like ? <Spinner /> : "Like"}
                </button>
            )}
            {error && <ErrorToast error={error} />}
        </>
    );

    function isLikedPost() {
        return post?.likes.includes(user?._id);
    }

    async function onClickHandler() {
        try {
            setLoading({ ...loading, like: true });
            const result = await postServices.like(post?._id);
            if (result.ok) {
                setPost({ ...post, likes: result.data });
            } else {
                setError(result.error);
                setTimeout(() => setError(""), 4000);
            }
        } catch (err) {
            setError("An un-expected error occurred");
            setTimeout(() => setError(""), 4000);
        } finally {
            setLoading({ ...loading, like: false });
        }
    }

    async function dislikePost() {
        try {
            setLoading({ ...loading, dislike: true });
            const result = await postServices.dislike(post?._id);
            if (result.ok === false) {
                setError(result.error);
                setTimeout(() => setError(""), 4000);
            } else {
                setPost({ ...post, likes: result.data });
            }
        } catch (err) {
            setError("An un-expected error occurred");
            setTimeout(() => setError(""), 4000);
        } finally {
            setLoading({ ...loading, dislike: false });
        }
    }
}
