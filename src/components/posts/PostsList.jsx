import PostProvider from "../../contexts/post";
import { PostItem } from ".";
import { arrayProp } from "../../utils/propTypes";

export default function PostsList({ posts }) {
    return (
        <>
            {posts.map((post) => {
                return (
                    <PostProvider key={post._id}>
                        <PostItem postData={post} />
                    </PostProvider>
                );
            })}
        </>
    );
}

PostsList.propTypes = {
    posts: arrayProp,
};
