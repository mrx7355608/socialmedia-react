import { useEffect, useState } from "react";
import { usePostContext } from "../../contexts/post";
import { useCommentsContext } from "../../contexts/comments";
import { booleanProp, funcProp } from "../../utils/propTypes";
import Spinner from "../spinners/Spinner";
import { CommentForm, CommentsList } from "../comments";

export default function CommentsSectionModal({
    showComments, // used to fetch comments only when comments modal is visible
    setShowComments,
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { post } = usePostContext();
    const { setComments } = useCommentsContext();

    const getComments = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/comments/${post._id}`, {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((result) => setComments(result.data))
            .catch(() => setError("An un-expected error occurred"))
            .finally(() => setLoading(false));
    };

    // Fetch comments from server and update comments context
    useEffect(() => {
        if (showComments) {
            getComments();
        }
    }, [showComments]);

    return (
        <>
            <dialog
                id={`my_modal_${post._id}`}
                className="modal p-0 mx-auto"
                style={{ width: "95vw" }}
            >
                <div
                    className="modal-box w-full lg:w-11/12 lg:max-w-4xl p-0 relative"
                    style={{ height: "90vh" }}
                >
                    <h3 className="font-bold text-xl text-center mb-9 mt-5">
                        Comments
                    </h3>

                    {/* Modal close button */}
                    <img
                        src="/close.png"
                        alt="close cross icon"
                        onClick={() => {
                            document
                                .getElementById(`my_modal_${post?._id}`)
                                .close();
                            setShowComments(false);
                        }}
                        className="hover:cursor-pointer p-2 w-8 h-8 rounded-full hover:bg-gray-700 object-cover absolute top-5 right-6"
                    />

                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <p className="text-red-400 text-lg mt-8">{error}</p>
                    ) : (
                        <CommentsList />
                    )}
                    {/* Input for creating comments */}
                    <CommentForm />
                </div>
            </dialog>
        </>
    );
}

function Loading() {
    return (
        <div className="flex items-center justify-center mx-auto h-1/2">
            <Spinner />
        </div>
    );
}

CommentsSectionModal.propTypes = {
    showComments: booleanProp,
    setShowComments: funcProp,
};
