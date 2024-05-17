import { useState } from "react";
import { useUserContext } from "../../contexts/user";
import { stringProp } from "../../utils/propTypes";
import DeleteCommentButton from "./DeleteCommentButton";

export default function CommentItem({ comment }) {
    const { user } = useUserContext();
    const [inEditMode, setInEditMode] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.text);
    const [commentState, setCommentState] = useState(comment);
    const [isEditing, setIsEditing] = useState(false);
    const [editingError, setEditingError] = useState("");

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
                    {inEditMode ? (
                        <form onSubmit={onSubmitHandler}>
                            <input
                                type="text"
                                className="input input-bordered bg-transparent w-full"
                                name="text"
                                value={editedComment}
                                onChange={onChangeHandler}
                            />
                            {/* To prevent the user from spamming enter button
                                and submitting the form
                             */}
                            {!isEditing && (
                                <button
                                    type="submit"
                                    className="hidden"
                                ></button>
                            )}
                        </form>
                    ) : (
                        <p className="text-gray-300">{commentState.text}</p>
                    )}
                </div>
                {user?._id === comment.author._id ? (
                    <div className="text-sm ml-1 mt-1">
                        <span
                            onClick={toggleEditMode}
                            className="mr-3 hover:underline hover:cursor-pointer"
                        >
                            {inEditMode
                                ? isEditing
                                    ? "Editing..."
                                    : "Cancel"
                                : "Edit"}
                        </span>
                        <DeleteCommentButton comment={comment} />
                    </div>
                ) : null}
            </div>
        </div>
    );

    function toggleEditMode() {
        setInEditMode(!inEditMode);
    }

    function onChangeHandler(e) {
        setEditedComment(e.target.value);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        const url = `/api/v1/comments/${comment._id}`;
        const options = {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: editedComment }),
        };
        try {
            setIsEditing(true);
            const response = await fetch(url, options);
            const result = await response.json();
            setIsEditing(false);

            if (result.ok) {
                setCommentState(result.data);
                setInEditMode(false);
            } else {
                setEditingError(result.error);
            }
        } catch (err) {
            setIsEditing(false);
        }
    }
}

CommentItem.propTypes = {
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
