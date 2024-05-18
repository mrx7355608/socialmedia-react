import { useEffect, useState } from "react";
import { usePostContext } from "../../contexts/post";
import Spinner from "../spinners/Spinner";
import { PostServices } from "../../api/posts";

export default function EditPostModal() {
    const { post, setPost } = usePostContext();

    const [editContent, setEditContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const postServices = PostServices();

    useEffect(() => {
        if (post) {
            setEditContent(post.content);
        }
    }, [post]);

    return (
        <dialog
            id={`edit_post_${post?._id}`}
            className="modal mx-auto"
            style={{ width: "95vw" }}
        >
            <div className="modal-box w-full">
                <h3 className="font-bold text-xl text-center mb-10">
                    Edit Post
                </h3>
                <div className="flex items-center justify-center w-full max-w-md mx-auto">
                    <textarea
                        className="textarea textarea-bordered w-full resize-none"
                        value={editContent}
                        onChange={onChangeHandler}
                        rows={6}
                    ></textarea>
                    <p className="text-red-500 mt-1">{error}</p>
                </div>
                <div className="modal-action">
                    {loading ? (
                        <button className="btn btn-primary">
                            <Spinner />
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={editPost}>
                            Edit
                        </button>
                    )}
                    <button className="btn" onClick={closeEditPostModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );

    async function editPost() {
        if (!editContent) {
            return setError("Nothing to edit");
        }

        try {
            setLoading(true);
            const response = await postServices.edit(post?._id, {
                content: editContent,
            });
            setLoading(false);
            if (response.ok) {
                closeEditPostModal();
                setPost((prev) => {
                    return { ...prev, content: response.data.content };
                });
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError("An un-exepected error occurred");
            setLoading(false);
        }
    }

    function onChangeHandler(e) {
        const { value } = e.target;
        setEditContent(value);
    }

    function closeEditPostModal() {
        document.getElementById(`edit_post_${post?._id}`).close();
    }
}
