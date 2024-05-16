import { funcProp, stringProp } from "../../utils/propTypes";
import { FaRegComment } from "react-icons/fa";

export default function CommentButton({ setShowComments, postID }) {
    return (
        <button className="btn btn-ghost flex-1" onClick={onClickHandler}>
            <FaRegComment size={20} />
            Comment
        </button>
    );

    function onClickHandler() {
        setShowComments(true);
        document.getElementById(`my_modal_${postID}`).showModal();
    }
}

CommentButton.propTypes = {
    setShowComments: funcProp,
    postID: stringProp,
};
