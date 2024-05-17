import { useState } from "react";
import { stringProp } from "../../utils/propTypes";
import { useCommentsContext } from "../../contexts/comments";

export default function DeleteCommentButton({ comment }) {
    const { setComments } = useCommentsContext();

    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingError, setDeletingError] = useState("");
    return (
        <>
            {isDeleting ? (
                <span className="hover:underline hover:cursor-pointer">
                    Deleting...
                </span>
            ) : deletingError ? (
                <span className="text-red-400">{deletingError}</span>
            ) : (
                <span
                    onClick={deleteComment}
                    className="hover:underline hover:cursor-pointer"
                >
                    Delete
                </span>
            )}
        </>
    );

    async function deleteComment() {
        const url = `/api/v1/comments/${comment._id}`;
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

DeleteCommentButton.propTypes = {
    comment: {
        _id: stringProp,
        text: stringProp,
        author: {
            _id: stringProp,
            profilePicture: stringProp,
            fullname: stringProp,
        },
    },
};
