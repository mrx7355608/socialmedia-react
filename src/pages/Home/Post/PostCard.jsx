import { arrayProp, dateProp, stringProp } from "../../../utils/propTypes";
import PostCardMenu from "./PostCardMenu";
import { usePostContext } from "../../../contexts/post";
import AuthorAndPubilshData from "./AuthorAndPubilshData";
import CommentsList from "../CommentsSection/List";
import { useEffect, useState } from "react";

export default function PostCard({ post }) {
    const { setPost } = usePostContext();
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (post) {
            setPost(post);
        }
    }, [post, setPost]);

    return (
        <div className="relative flex flex-col items-start justify-start bg-gray-800 p-4 rounded-lg mb-4 w-full shadow-lg">
            {/* Post author and publishing details */}
            <AuthorAndPubilshData />

            {/* Post content */}
            <p className="text-gray-300 mt-5">{post.content}</p>

            {/* No. of likes and comments on post */}
            {/* <p className="mt-7 text-gray-500 text-sm font-medium">
                {post.likes.length} Likes {post.comments.length} Comments
            </p> */}

            {/* Like and Comment button */}
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
                    onClick={() => {
                        setShowComments(true);
                        document
                            .getElementById(`my_modal_${post._id}`)
                            .showModal();
                    }}
                >
                    <img
                        src="/comment.png"
                        alt="like icon"
                        className="inline w-5 h-5"
                    />
                    Comment
                </button>
            </div>

            {/* Show a menu for  edit and delete buttons */}
            <PostCardMenu />

            {/* Comments section modal */}
            <CommentsList
                showComments={showComments}
                setShowComments={setShowComments}
            />
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
    },
};
