import {
    arrayProp,
    dateProp,
    funcProp,
    stringProp,
} from "../../../utils/propTypes";
import PostCardMenu from "./PostCardMenu";
import { useUserContext } from "../../../contexts/user";
import CommentsList from "../CommentsSection/List";

export default function PostCard({ post, removePostFromTimeline }) {
    const { user } = useUserContext();

    return (
        <div className="relative flex flex-col items-start justify-start bg-gray-800 p-4 rounded-lg mb-4 w-full shadow-lg">
            <div className="w-full flex items-center">
                <img
                    src={post.author.profilePicture}
                    alt="post author picture"
                    className="w-10 h-10 object-cover rounded-full inline mr-3"
                />
                <div>
                    <p className="text-gray-300 font-medium">
                        {post.author.fullname}
                    </p>
                    <p className="text-gray-500 font-medium text-xs">
                        Posted on {new Date(post.createdAt).toDateString()}
                    </p>
                </div>
            </div>

            <p className="text-gray-300 mt-5">{post.content}</p>

            <p className="mt-7 text-gray-500 text-sm font-medium">
                {post.likes.length} Likes {post.comments.length} Comments
            </p>

            <div className="flex gap-2 w-full mt-4">
                <button className="btn btn-ghost flex-1">
                    <img
                        src="/like.png"
                        alt="like icon"
                        className="inline w-5 h-5"
                    />
                    Like
                </button>
                <button
                    className="btn btn-ghost flex-1"
                    onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                    }
                >
                    <img
                        src="/comment.png"
                        alt="like icon"
                        className="inline w-5 h-5"
                    />
                    Comment
                </button>
            </div>

            {user && post.author._id === user._id && (
                <PostCardMenu
                    removePostFromTimeline={removePostFromTimeline}
                    postID={post._id}
                />
            )}
            <CommentsList postID={post._id} />
        </div>
    );
}

PostCard.propTypes = {
    post: {
        _id: stringProp,
        content: stringProp,
        author: {
            _id: stringProp,
            profilePicture: stringProp,
            fullname: stringProp,
        },
        createdAt: dateProp,
        likes: arrayProp,
        comments: arrayProp,
    },
    removePostFromTimeline: funcProp,
};
