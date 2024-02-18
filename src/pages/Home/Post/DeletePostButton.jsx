import { useState } from "react";
import { ErrorToast } from "../../../components/Toasts";
import Spinner from "../../../components/Spinner";
import { useTimelineContext } from "../../../contexts/timeline";
import { usePostContext } from "../../../contexts/post";

export default function DeletePostButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { setTimeline } = useTimelineContext();
    const { post } = usePostContext();

    return (
        <>
            {loading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <div onClick={deletePost} className="text-red-400">
                    Delete
                </div>
            )}
            {error && <ErrorToast error={error} />}
        </>
    );

    async function deletePost() {
        const url = `http://localhost:8000/posts/${post._id}`;
        const options = {
            method: "DELETE",
            credentials: "include",
        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            setLoading(false);

            if (response.ok) {
                // Update timeline
                removePostFromTimeline(post._id);
            } else {
                const result = await response.json();
                setError(result.error);
            }
        } catch (err) {
            console.log(err.message);
            setError("An un-expected error occurred");
            setLoading(false);
        }
    }

    function removePostFromTimeline(postID) {
        setTimeline((prev) => prev.filter((p) => p._id !== postID));
    }
}
