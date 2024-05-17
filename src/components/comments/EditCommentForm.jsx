import { useState } from "react";
import { booleanProp, funcProp, stringProp } from "../../utils/propTypes";
import CommentsServices from "../../api/comments";
import { ErrorToast } from "../../components/toasts";

export default function EditCommentForm({ sharedStates, setSharedStates }) {
    const [editedComment, setEditedComment] = useState(sharedStates.comment);
    const [apiError, setApiError] = useState("");
    const commentServices = CommentsServices();

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    className="input input-bordered bg-transparent w-full"
                    name="text"
                    value={editedComment}
                    onChange={onChangeHandler}
                />
                <button type="submit" className="hidden"></button>
            </form>
            {apiError && <ErrorToast error={apiError} />}
        </div>
    );

    function onChangeHandler(e) {
        setEditedComment(e.target.value);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        if (!editedComment.trim() || sharedStates.isEditing) {
            return;
        }

        try {
            setSharedStates({ ...sharedStates, isEditing: true });
            const response = await commentServices.edit(
                sharedStates.commentID,
                {
                    text: editedComment,
                }
            );
            if (response.ok === false) {
                setSharedStates({
                    ...sharedStates,
                    isEditing: false,
                    inEditMode: false,
                });
                return setApiError(response.error);
            }
            setSharedStates({
                ...sharedStates,
                isEditing: false,
                inEditMode: false,
                comment: response.data.text,
            });
        } catch (err) {
            setApiError("An un-expected error occured");
            setSharedStates({
                ...sharedStates,
                isEditing: false,
                inEditMode: false,
            });
        }

        /*
         
        Code below was not working for some unknown reasons

         finally {
             setSharedStates({
                 ...sharedStates,
                 isEditing: false,
                 inEditMode: false,
             });
         }
        */
    }
}
EditCommentForm.propTypes = {
    closeEditMode: funcProp,
    sharedStates: {
        isEditing: booleanProp,
        inEditMode: booleanProp,
        comment: stringProp,
        commentID: stringProp,
    },
    setSharedStates: funcProp,
};
