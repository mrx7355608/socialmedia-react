import { useEffect, useState } from "react";
import { arrayProp, dateProp, stringProp } from "../../utils/propTypes";
import { usePostContext } from "../../contexts/post";
import CommentsProvider from "../../contexts/comments";
import { CommentsSectionModal } from "../modals";

import PostMenu from "./PostMenu";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import EditPostModal from "../modals/EditPostModal";
import DeletePostModal from "../modals/DeletePostModal";

export default function PostCard({ postData }) {
    const { post, setPost } = usePostContext();
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (postData) {
            setPost(postData);
        }
    }, [postData, setPost]);

    // Don't render anything until post context is not updated
    if (!post) {
        return;
    }

    return (
        <article className="relative flex flex-col items-start justify-start bg-myGray p-4 rounded-lg w-full shadow-lg">
            {/* Author and publishing details */}
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

            {/* Content */}
            <p
                className="text-gray-300 mt-5"
                style={{
                    whiteSpace: "pre-line",
                }}
            >
                {post.content}
            </p>

            {/* No. of likes and comments on post */}
            {/* <p className="mt-7 text-gray-500 text-sm font-medium">
                {post.likes.length} Likes {post.comments.length} Comments
            </p> */}

            {/* Like and Comment button */}
            <div className="flex gap-2 w-full mt-4">
                <LikeButton />
                <CommentButton
                    setShowComments={setShowComments}
                    postID={post._id}
                />
            </div>

            {/* Show a menu for  edit and delete buttons */}
            <PostMenu />

            {/* Comments section modal */}
            <CommentsProvider>
                <CommentsSectionModal
                    showComments={showComments}
                    setShowComments={setShowComments}
                />
            </CommentsProvider>

            {/* Edit and delete post modal */}
            <EditPostModal />
            <DeletePostModal />
        </article>
    );
}

PostCard.propTypes = {
    postData: {
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
