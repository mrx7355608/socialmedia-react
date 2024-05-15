import { useState } from "react";
import Spinner from "../../components/spinners/Spinner";
import { useUserContext } from "../../contexts/user";
import { useTimelineContext } from "../../contexts/timeline";

export default function CreatePostBox() {
    const { user } = useUserContext();
    const { timeline, setTimeline } = useTimelineContext();

    const [content, setContent] = useState("");
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col justify-start w-full p-4 rounded-lg mb-4 bg-myGray">
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
        </div>
    );

    async function createPost() {
        const url = "/api/v1/posts";
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);
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
            setLoading(false);
        }
    }
}
