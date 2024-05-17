import { useCommentsContext } from "../../contexts/comments";
import CommentItem from "./CommentItem";

export default function CommentsList() {
    const { comments } = useCommentsContext();

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
