import { useUserContext } from "../../../contexts/user";
import { stringProp } from "../../../utils/propTypes";
import DeleteCommentButton from "./DeleteCommentButton";

export default function SingleComment({ comment }) {
    const { user } = useUserContext();

    return (
        <div className="flex gap-5 items-center mt-4">
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
                <div
                    className="chat-bubble before:content-none rounded-lg"
                    style={{
                        borderEndStartRadius: "9px",
                    }}
                >
                    <p className="font-medium text-gray-300">
                        {comment.author.fullname}
                    </p>
                    <p className="text-gray-300">{comment.text}</p>
                </div>
                {user?._id === comment.author._id ? (
                    <div className="text-sm ml-1 mt-1">
                        <span className="mr-3 hover:underline hover:cursor-pointer">
                            Edit
                        </span>
                        <DeleteCommentButton comment={comment} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

SingleComment.propTypes = {
    comment: {
        _id: stringProp,
        text: stringProp,
        author: {
            _id: stringProp,
            profilePicture: stringProp,
            fullname: stringProp,
        },
    },
};
