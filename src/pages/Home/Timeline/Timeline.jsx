import useAuthFetch from "../../../hooks/useAuthFetch";
import Spinner from "../../../components/Spinner";
import PostCard from "./PostCard";

export default function Timeline() {
    const { loading, error, resp } = useAuthFetch(
        "http://localhost:8000/posts/timeline"
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <p className="text-red-400 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen">
            {resp.map((post) => {
                return <PostCard post={post} key={post._id} />;
            })}
        </div>
    );
}
