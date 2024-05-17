import { useState } from "react";
import { useUserContext } from "../../contexts/user";
import { stringProp } from "../../utils/propTypes";
import EditCommentForm from "./EditCommentForm";

export default function CommentItem({ cmnt }) {
    const { user } = useUserContext();
    const [inEditMode, setInEditMode] = useState(false);
    const [comment, setComment] = useState(cmnt);
    // eslint-disable-next-line
    const [_editingError, setEditingError] = useState("");

    return (
        <div className="flex gap-5 items-center mt-4">
            {/* Comment's author profile picture */}
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
                {/* Comment bubble */}
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
                        <EditCommentForm
                            commentID={cmnt._id}
                            closeEditMode={closeEditMode}
                            setComment={setComment}
                            oldCommentText={cmnt.text}
                        />
                    ) : (
                        <p className="text-gray-300">{comment.text}</p>
                    )}
                </div>
                {/* Menu */}
                <div className="ml-2">
                    {inEditMode ? (
                        <span
                            className="text-sm mr-3 cursor-pointer hover:underline"
                            onClick={closeEditMode}
                        >
                            Cancel
                        </span>
                    ) : (
                        <span
                            className="text-sm mr-3 cursor-pointer hover:underline"
                            onClick={openEditMode}
                        >
                            Edit
                        </span>
                    )}
                </div>
                {/* {inEditMode ? (
                        <EditCommentForm />
                    ) : (
                        <p className="text-gray-300">{commentState.text}</p>
                    )} */}
                {/* {isAuthor() && (
                                            <CommentMenu
                        openEditMode={openEditMode}
                        closeEditMode={closeEditMode}
                    />
                )} */}
            </div>
        </div>
    );

    function openEditMode() {
        setInEditMode(true);
    }

    function closeEditMode() {
        setInEditMode(false);
    }

    function isAuthor() {
        return user?._id === comment.author._id;
    }
}

CommentItem.propTypes = {
    cmnt: {
        _id: stringProp,
        text: stringProp,
        author: {
            _id: stringProp,
            profilePicture: stringProp,
            fullname: stringProp,
        },
    },
};
