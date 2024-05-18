import { usePostContext } from "../../contexts/post";
import { useTimelineContext } from "../../contexts/timeline";
import { useState } from "react";
import Spinner from "../spinners/Spinner";
import { PostServices } from "../../api/posts";

export default function DeletePostModal() {
    const { post } = usePostContext();
    const { setTimeline } = useTimelineContext();
    const [loading, setLoading] = useState(false);
    const postServices = PostServices();

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
        try {
            setLoading(true);
            const response = await postServices.remove(post?._id);
            if (response == null) {
                removePostFromTimeline(post._id);
            } else {
                alert(response.error);
            }
        } catch (err) {
            alert("An un-expected error occurred");
        } finally {
            setLoading(false);
        }
    }

    function removePostFromTimeline(postID) {
        setTimeline((prev) => prev.filter((p) => p._id !== postID));
    }
}
