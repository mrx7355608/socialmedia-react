import { useState } from "react";
import { funcProp, stringProp } from "../../utils/propTypes";
import CommentsServices from "../../api/comments";

export default function EditCommentForm({
    commentID,
    oldCommentText,
    closeEditMode,
    setComment,
}) {
    const [editedComment, setEditedComment] = useState(oldCommentText);
    const [loading, setLoading] = useState(false);
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
        </div>
    );

    function onChangeHandler(e) {
        setEditedComment(e.target.value);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        if (loading || !editedComment.trim()) {
            return;
        }

        try {
            setLoading(true);
            const response = await commentServices.edit(commentID, {
                text: editedComment,
            });
            if (response.ok) {
                closeEditMode();
                setComment(response.data.text);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }
}
EditCommentForm.propTypes = {
    commentID: stringProp,
    oldCommentText: stringProp,
    closeEditMode: funcProp,
    setComment: funcProp,
};
