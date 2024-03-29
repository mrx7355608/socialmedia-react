import { useCommentsContext } from "../../../contexts/comments";
import SingleComment from "./SingleComment";

export default function CommentsList() {
    const { comments } = useCommentsContext();

    return (
        <>
            <div className="p-4 overflow-y-auto" style={{ height: "73%" }}>
                {comments.map((cmnt) => {
                    return <SingleComment comment={cmnt} key={cmnt._id} />;
                })}
            </div>
        </>
    );
}
