import { useState } from "react";
import { usePostContext } from "../../contexts/post";
import { useUserContext } from "../../contexts/user";
import { ErrorToast } from "../toasts";
import { PostServices } from "../../api/posts";

export default function LikeButton() {
    const { post, setPost } = usePostContext();
    const { user } = useUserContext();
    const [error, setError] = useState("");
    const postServices = PostServices();

    return (
        <>
            {isLikedPost() ? (
                <button
                    className="btn btn-primary flex-1 text-white"
                    onClick={dislikePost}
                >
                    <img
                        src="/like.png"
                        alt="like icon"
                        className="inline w-5 h-5"
                    />
                    Liked
                </button>
            ) : (
                <button
                    className="btn btn-ghost flex-1"
                    onClick={onClickHandler}
                >
                    <img
                        src="/like.png"
                        alt="like icon"
                        className="inline w-5 h-5"
                    />
                    Like
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
            const result = await postServices.like(post?._id);
            if (result.ok === false) {
                setError(result.error);
                setTimeout(() => setError(""), 4000);
            } else {
                setPost({ ...post, likes: result.data });
            }
        } catch (err) {
            setError("An un-expected error occurred");
            setTimeout(() => setError(""), 4000);
        }
    }

    async function dislikePost() {
        try {
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
        }
    }
}
