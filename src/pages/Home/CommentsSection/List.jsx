import { arrayProp, funcProp } from "../../../utils/propTypes";
import SingleComment from "./SingleComment";

export default function CommentsList({ comments, setComments }) {
    return (
        <>
            <div className="p-4 overflow-y-auto" style={{ height: "73%" }}>
                {comments.map((cmnt) => {
                    return (
                        <SingleComment
                            setComments={setComments}
                            comment={cmnt}
                            key={cmnt._id}
                        />
                    );
                })}
            </div>
        </>
    );
}

CommentsList.propTypes = {
    comments: arrayProp,
    setComments: funcProp,
};
