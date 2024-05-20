import useFetch from "../hooks/useFetch";
import { Spinner } from "../components/spinners";
import { PostsList } from "../components/posts";
import { ErrorMessage } from "../components/error";
import { stringProp } from "../utils/propTypes";
import usePostsStore from "../store/posts.store";
import { useEffect } from "react";

export default function PostsContainer({ endpoint }) {
    // Fetch posts
    const { loading, error, resp } = useFetch(endpoint);
    const setPosts = usePostsStore((state) => state.setPosts);

    // Update posts state in store
    useEffect(() => {
        if (resp) {
            setPosts(resp);
        }
    }, [resp, setPosts]);

    // Render UI
    return (
        <>
            {loading && <Spinner />}
            {error && <ErrorMessage errorMessage={error} />}
            {resp && <PostsList posts={resp} />}
        </>
    );
}

PostsContainer.propTypes = {
    endpoint: stringProp,
};
