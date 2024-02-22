import { useState } from "react";
import { usePostContext } from "../../../contexts/post";
import { useUserContext } from "../../../contexts/user";
import { ErrorToast } from "../../../components/Toasts";

export default function LikeButton() {
    const { post, setPost } = usePostContext();
    const { user } = useUserContext();
    const [error, setError] = useState("");

    return (
        <>
            {post?.likes.includes(user?._id) ? (
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
                <button className="btn btn-ghost flex-1" onClick={likePost}>
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

    async function likePost() {
        const url = `http://localhost:8000/posts/like/${post?._id}`;
        const options = {
            method: "PATCH",
            credentials: "include",
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
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
        const url = `http://localhost:8000/posts/dislike/${post?._id}`;
        const options = {
            method: "PATCH",
            credentials: "include",
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
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
