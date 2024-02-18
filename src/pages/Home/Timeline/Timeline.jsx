import useAuthFetch from "../../../hooks/useAuthFetch";
import Spinner from "../../../components/Spinner";
import PostCard from "../Post/PostCard";
import { useEffect } from "react";
import CreatePostBox from "./CreatePostBox";
import PostProvider from "../../../contexts/post";
import { useTimelineContext } from "../../../contexts/timeline";

export default function Timeline() {
    const { timeline, setTimeline } = useTimelineContext();
    const { loading, error, resp } = useAuthFetch(
        "http://localhost:8000/posts/timeline"
    );

    useEffect(() => {
        if (resp) {
            setTimeline(resp);
        }
    }, [resp, setTimeline]);

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
            <CreatePostBox updateTimeline={updateTimeline} />
            <div className="flex flex-col items-center justify-start min-h-screen">
                {timeline.map((post) => {
                    return (
                        <PostProvider key={post._id}>
                            <PostCard
                                post={post}
                                removePostFromTimeline={removePostFromTimeline}
                            />
                        </PostProvider>
                    );
                })}
            </div>
        </>
    );

    function updateTimeline(newPost) {
        setTimeline((prev) => {
            return [newPost, ...prev];
        });
    }

    function removePostFromTimeline(postID) {
        setTimeline((prev) => prev.filter((p) => p._id !== postID));
    }
}
