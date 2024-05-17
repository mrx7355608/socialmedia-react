import { useState } from "react";
import { useUserContext } from "../../contexts/user";
import { stringProp } from "../../utils/propTypes";
import CommentMenu from "./CommentMenu";
import EditCommentForm from "./EditCommentForm";

export default function CommentItem({ cmnt }) {
    const { user } = useUserContext();

    const [sharedStates, setSharedStates] = useState({
        isEditing: false,
        inEditMode: false,
        comment: cmnt.text,
        commentID: cmnt._id,
    });

    // used to update comment text after editing in realtime

    return (
        <div className="flex gap-5 items-center mt-4">
            {/* Comment's author profile picture */}
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Comment's author profile picture"
                        src={cmnt.author.profilePicture}
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
                        {cmnt.author.fullname}
                    </p>

                    {sharedStates.inEditMode ? (
                        <EditCommentForm
                            sharedStates={sharedStates}
                            setSharedStates={setSharedStates}
                        />
                    ) : (
                        <p className="text-gray-300">{sharedStates.comment}</p>
                    )}
                </div>

                {/* Menu */}
                {isAuthor() && (
                    <CommentMenu
                        sharedStates={sharedStates}
                        setSharedStates={setSharedStates}
                    />
                )}
            </div>
        </div>
    );

    function isAuthor() {
        return user?._id === cmnt.author._id;
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
