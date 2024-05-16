// COMPONENTS
import Spinner from "../../../components/spinners/Spinner";

// CONTEXTS
import PostProvider from "../../../contexts/post";
import { useTimelineContext } from "../../../contexts/timeline";
import useTimeline from "../../../hooks/useTimeline";
import { PostItem } from "../../../components/posts";

export default function Timeline() {
    const { timeline } = useTimelineContext();

    // Fetches timeline from server and updates timeline context
    const { loading, error } = useTimeline();

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
        <>
            {timeline &&
                timeline.map((post) => {
                    return (
                        <PostProvider key={post._id}>
                            <PostItem postData={post} />
                        </PostProvider>
                    );
                })}
        </>
    );
}
