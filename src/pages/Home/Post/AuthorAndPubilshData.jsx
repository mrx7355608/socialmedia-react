import { usePostContext } from "../../../contexts/post";

export default function AuthorAndPubilshData() {
    const { post } = usePostContext();

    return (
        <div className="w-full flex items-center">
            <img
                src={post?.author.profilePicture}
                alt="post author picture"
                className="w-10 h-10 object-cover rounded-full inline mr-3"
            />
            <div>
                <p className="text-gray-300 font-medium">
                    {post?.author.fullname}
                </p>
                <p className="text-gray-500 font-medium text-xs">
                    Posted on {new Date(post?.createdAt).toDateString()}
                </p>
            </div>
        </div>
    );
}
