import { useState } from "react";
import { ErrorToast } from "../toasts";
import CommentsServices from "../../api/comments";
import { booleanProp, funcProp } from "../../utils/propTypes";
import useCommentsStore from "../../store/comments.store";

export default function CommentMenu({ sharedStates, setSharedStates }) {
    const commentsServices = CommentsServices();
    const [apiError, setApiError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const filterComment = useCommentsStore((state) => state.filterComment);

    return (
        <div className="ml-2 mt-1 text-sm">
            {/* EDIT BUTTON */}
            {sharedStates.inEditMode ? (
                sharedStates.isEditing ? (
                    <span className="mr-3 cursor-pointer hover:underline">
                        Editing...
                    </span>
                ) : (
                    <span
                        className="mr-3 cursor-pointer hover:underline"
                        onClick={closeEditMode}
                    >
                        Cancel
                    </span>
                )
            ) : (
                <span
                    className="mr-3 cursor-pointer hover:underline"
                    onClick={openEditMode}
                >
                    Edit
                </span>
            )}

            {/* DELETE BUTTON */}
            {isDeleting ? (
                <span className="cursor-pointer hover:underline">
                    Deleting...
                </span>
            ) : (
                <span
                    className="cursor-pointer hover:underline"
                    onClick={deleteComment}
                >
                    Delete
                </span>
            )}
            {apiError && <ErrorToast error={apiError} />}
        </div>
    );

    function openEditMode() {
        setSharedStates({ ...sharedStates, inEditMode: true });
    }
    function closeEditMode() {
        setSharedStates({ ...sharedStates, inEditMode: false });
    }
    async function deleteComment() {
        try {
            // make request on server
            setIsDeleting(true);
            const response = await commentsServices.remove(
                sharedStates.commentID
            );

            // If there's an error, the server will not return 204 (no content)
            // So the response will be defined
            if (response) {
                return setApiError(response.error);
            }
            // filter out this comment from comments context
            filterComment(sharedStates.commentID);
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
            setIsDeleting(true);
        }
    }
}

CommentMenu.propTypes = {
    sharedStates: {
        isEditing: booleanProp,
        inEditMode: booleanProp,
    },
    setSharedStates: funcProp,
};
