import PostProvider from "../../contexts/post";
import { PostItem } from ".";
import { arrayProp } from "../../utils/propTypes";

export default function PostsList({ posts }) {
    return (
        <div className="flex flex-col items-center justify-start gap-4 max-w-md">
            {posts.map((post) => {
                return (
                    <PostProvider key={post._id}>
                        <PostItem postData={post} />
                    </PostProvider>
                );
            })}
        </div>
    );
}

PostsList.propTypes = {
    posts: arrayProp,
};
