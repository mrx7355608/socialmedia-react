import { useState } from "react";
import { useUserContext } from "../../../contexts/user";
import { stringProp, funcProp } from "../../../utils/propTypes";

export default function SingleComment({ comment, setComments }) {
    const { user } = useUserContext();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingError, setDeletingError] = useState("");

    return (
        <div className="flex gap-5 items-center mt-4">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="comment's author profile picture"
                        src={comment.author.profilePicture}
                    />
                </div>
            </div>
            <div
                className="flex flex-col"
                style={{
                    minWidth: "250px",
                    maxWidth: "400px",
                }}
            >
                <div
                    className="chat-bubble before:content-none rounded-lg"
                    style={{
                        borderEndStartRadius: "9px",
                    }}
                >
                    <p className="font-medium text-gray-300">
                        {comment.author.fullname}
                    </p>
                    <p className="text-gray-300">{comment.text}</p>
                </div>
                {user?._id === comment.author._id ? (
                    <div className="text-sm ml-1 mt-1">
                        <span className="mr-3 hover:underline hover:cursor-pointer">
                            Edit
                        </span>
                        {isDeleting ? (
                            <span className="hover:underline hover:cursor-pointer">
                                Deleting...
                            </span>
                        ) : deletingError ? (
                            <span className="text-red-400">
                                {deletingError}
                            </span>
                        ) : (
                            <span
                                onClick={deleteComment}
                                className="hover:underline hover:cursor-pointer"
                            >
                                Delete
                            </span>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );

    async function deleteComment() {
        const url = `http://localhost:8000/comments/${comment._id}`;
        const options = {
            method: "DELETE",
            credentials: "include",
        };
        try {
            setIsDeleting(true);
            const response = await fetch(url, options);
            setIsDeleting(false);

            if (response.ok) {
                setComments((prev) => {
                    return prev.filter((c) => comment._id !== c._id);
                });
            } else {
                const result = await response.json();
                setDeletingError(result.error);
            }
        } catch (err) {
            setIsDeleting(false);
        }
    }
}

SingleComment.propTypes = {
    comment: {
        _id: stringProp,
        text: stringProp,
        author: {
            _id: stringProp,
            profilePicture: stringProp,
            fullname: stringProp,
        },
    },
    setComments: funcProp,
};
