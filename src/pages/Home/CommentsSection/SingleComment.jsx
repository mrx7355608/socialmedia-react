import { stringProp } from "../../../utils/propTypes";

export default function SingleComment({ comment }) {
    return (
        <div className="chat chat-start mt-2">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={comment.author.profilePicture}
                    />
                </div>
            </div>
            <div
                className="chat-bubble before:content-none rounded-lg"
                style={{
                    borderEndStartRadius: "9px",
                    minWidth: "250px",
                    maxWidth: "400px",
                }}
            >
                <p className="font-medium text-gray-300">
                    {comment.author.fullname}
                </p>
                <p className="text-gray-300">{comment.text}</p>
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
