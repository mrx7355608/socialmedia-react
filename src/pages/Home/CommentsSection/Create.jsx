import { useState } from "react";
import { useUserContext } from "../../../contexts/user";
import { usePostContext } from "../../../contexts/post";
import Spinner from "../../../components/Spinner";

export default function CreateComment({ setComments }) {
    const { user } = useUserContext();
    const { post } = usePostContext();
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <form onSubmit={onSubmitHandler} className="w-full">
            <div className="flex items-center justify-center p-3 absolute bottom-0 left-0 w-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={user?.profilePicture}
                    className="rounded-full object-cover w-10 h-10"
                />
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full mx-3"
                    onChange={onChangeHandler}
                    value={newComment}
                />
                {loading ? (
                    <button className="btn btn-success">
                        <Spinner />
                    </button>
                ) : (
                    <button type="submit" className="btn btn-success">
                        Post
                    </button>
                )}
            </div>
        </form>
    );

    function onChangeHandler(e) {
        const { value } = e.target;
        setNewComment(value);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        if (!newComment.trim()) {
            return;
        }

        // make request to server with new comment
        const url = `http://localhost:8000/comments/${post._id}`;
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ text: newComment }),
        };

        try {
            setLoading(true);
            setNewComment("");
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);

            if (result.ok) {
                setComments((prev) => {
                    return [result.data, ...prev];
                });
            }
        } catch (err) {
            setLoading(false);
        }
    }
}

CreateComment.propTypes = {
    setComments: () => null,
};
