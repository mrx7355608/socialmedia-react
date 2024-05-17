import useCommentsStore from "../../store/comments.store";
import CommentItem from "./CommentItem";

export default function CommentsList() {
    const comments = useCommentsStore((state) => state.comments);

    return (
        <>
            <div className="p-4 overflow-y-auto" style={{ height: "73%" }}>
                {comments.map((cmnt) => {
                    return <CommentItem cmnt={cmnt} key={cmnt._id} />;
                })}
            </div>
        </>
    );
}
