import { usePostContext } from "../../../contexts/post";
import { useTimelineContext } from "../../../contexts/timeline";
import { useState } from "react";
import Spinner from "../../../components/Spinner";

export default function DeletePostModal() {
    const { post } = usePostContext();
    const { setTimeline } = useTimelineContext();
    const [loading, setLoading] = useState(false);

    return (
        <dialog
            id={`delete_post_${post?._id}`}
            className="modal mx-auto"
            style={{ width: "95vw" }}
        >
            <div className="modal-box">
                <h3 className="font-bold text-xl text-center mb-10">
                    Delete Post
                </h3>
                <p>Are you sure you want to delete this post?</p>
                <div className="modal-action">
                    {loading ? (
                        <button className="btn btn-error">
                            <Spinner />
                        </button>
                    ) : (
                        <button onClick={deletePost} className="btn btn-error">
                            Delete
                        </button>
                    )}
                    <button
                        className="btn btn-ghost"
                        onClick={closeDeletePostModal}
                    >
                        No
                    </button>
                </div>
            </div>
        </dialog>
    );

    function closeDeletePostModal() {
        document.getElementById(`delete_post_${post?._id}`).close();
    }

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
                removePostFromTimeline(post._id);
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (err) {
            alert("An un-expected error occurred");
            setLoading(false);
        }
    }

    function removePostFromTimeline(postID) {
        setTimeline((prev) => prev.filter((p) => p._id !== postID));
    }
}
