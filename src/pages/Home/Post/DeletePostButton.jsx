import { useState } from "react";
import { ErrorToast } from "../../../components/Toasts";
import { funcProp, stringProp } from "../../../utils/propTypes";
import Spinner from "../../../components/Spinner";

export default function DeletePostButton({ postID, removePostFromTimeline }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <>
            {loading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <div onClick={deletePost} className="text-red-400">
                    Delete
                </div>
            )}
            {error && <ErrorToast error={error} />}
        </>
    );

    async function deletePost() {
        const url = `http://localhost:8000/posts/${postID}`;
        const options = {
            method: "DELETE",
            credentials: "include",
        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            setLoading(false);

            if (response.ok) {
                // Update timeline
                removePostFromTimeline(postID);
            } else {
                const result = await response.json();
                setError(result.error);
            }
        } catch (err) {
            console.log(err.message);
            setError("An un-expected error occurred");
            setLoading(false);
        }
    }
}

DeletePostButton.propTypes = {
    postID: stringProp,
    removePostFromTimeline: funcProp,
};
