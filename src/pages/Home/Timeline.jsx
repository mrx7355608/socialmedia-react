import Spinner from "../../components/spinners/Spinner";
import { PostsList } from "../../components/posts";
import { useTimelineContext } from "../../contexts/timeline";
import useAuthFetch from "../../hooks/useAuthFetch";
import { useEffect } from "react";

export default function Timeline() {
    const { timeline, setTimeline } = useTimelineContext();
    const { loading, error, resp } = useAuthFetch("/api/v1/posts/timeline");

    useEffect(() => {
        if (resp) {
            setTimeline(resp);
        }
    }, [resp, setTimeline]);

    return (
        <>
            {loading && <Spinner />}
            {error && <p className="text-red-400 text-lg">{error}</p>}
            {timeline && <PostsList posts={timeline} />}
        </>
    );
}
