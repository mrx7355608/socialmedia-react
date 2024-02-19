// import CommentBubble from "./SingleComment";
import CreateComment from "./Create";
import Spinner from "../../../components/Spinner";
import { booleanProp, funcProp, stringProp } from "../../../utils/propTypes";
import { usePostContext } from "../../../contexts/post";
import { useEffect, useState } from "react";
import CommentsList from "./List";

export default function CommentsSection({ showComments, setShowComments }) {
    const { post } = usePostContext();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (showComments) {
            setLoading(true);
            fetch(`http://localhost:8000/comments/${post?._id}`, {
                method: "GET",
                credentials: "include",
            })
                .then((resp) => resp.json())
                .then((result) => setComments(result.data))
                .catch(() => setError("An un-expected error occurred"))
                .finally(() => setLoading(false));
        }
    }, [showComments, post?._id]);

    return (
        <>
            <dialog id={`my_modal_${post?._id}`} className="modal p-0">
                <div
                    className="modal-box w-11/12 max-w-4xl p-0 relative"
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
                        <ShowError errorMessage={error} />
                    ) : (
                        <CommentsList comments={comments} />
                    )}
                    {/* Input for creating comments */}
                    <CreateComment />
                </div>
            </dialog>
        </>
    );
}

CommentsSection.propTypes = {
    showComments: booleanProp,
    setShowComments: funcProp,
};

function ShowError({ errorMessage }) {
    return (
        <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
            <p className="text-red-400 text-lg">{errorMessage}</p>
        </div>
    );
}

ShowError.propTypes = {
    errorMessage: stringProp,
};

function Loading() {
    return (
        <div className="flex items-center justify-center mx-auto h-1/2">
            <Spinner />
        </div>
    );
}
