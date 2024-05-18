import { useState } from "react";
import Spinner from "../spinners/Spinner";
import { useUserContext } from "../../contexts/user";
import { useTimelineContext } from "../../contexts/timeline";
import { PostServices } from "../../api/posts";

export default function PostForm() {
    const { user } = useUserContext();
    const { timeline, setTimeline } = useTimelineContext();

    const [content, setContent] = useState("");
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const postServices = PostServices();

    return (
        <section className="flex flex-col justify-start w-full p-4 rounded-lg mb-4 bg-myGray">
            <div className="flex items-start w-full">
                <img
                    src={user?.profilePicture}
                    alt="user picture"
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <div className="w-full">
                    <textarea
                        className="textarea textarea-bordered textarea-md bg-transparent w-full resize-none"
                        placeholder="Share your thougts"
                        rows={3}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    {apiError && (
                        <p className="text-red-500 mt-1">{apiError}</p>
                    )}
                </div>
            </div>
            {loading ? (
                <button className="btn btn-success w-24 ml-auto mt-3">
                    <Spinner />
                </button>
            ) : (
                <button
                    onClick={createPost}
                    className="btn btn-success w-24 ml-auto mt-3"
                >
                    Post
                </button>
            )}
        </section>
    );

    async function createPost() {
        try {
            setLoading(true);
            const result = await postServices.create({ content });
            if (result.ok) {
                // Update timeline state
                setTimeline([result.data, ...timeline]);
            } else {
                setApiError(result.error);
                setTimeout(() => setApiError(""), 4000);
            }
        } catch (err) {
            setApiError("An un-expected error occurred");
            setTimeout(() => setApiError(""), 4000);
        } finally {
            setLoading(false);
        }
    }
}
