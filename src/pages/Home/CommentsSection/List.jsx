import CommentBubble from "./SingleComment";
import CreateComment from "./Create";
import { useEffect, useState } from "react";
import useAuthFetch from "../../../hooks/useAuthFetch";
import Spinner from "../../../components/Spinner";
import { stringProp } from "../../../utils/propTypes";

export default function CommentsList({ postID }) {
    const { loading, error, resp } = useAuthFetch(
        `http://localhost:8000/comments/${postID}`
    );
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (resp) {
            setComments(resp);
        }
    }, [resp]);

    if (loading) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 h-full">
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
            <dialog id="my_modal_4" className="modal p-0">
                <div
                    className="modal-box w-11/12 max-w-4xl p-0 relative"
                    style={{ height: "90vh" }}
                >
                    <h3 className="font-bold text-xl text-center mb-9 mt-5">
                        Comments
                    </h3>
                    <img
                        src="/close.png"
                        alt="close cross icon"
                        onClick={() => {
                            document.getElementById("my_modal_4").close();
                        }}
                        className="hover:cursor-pointer p-2 w-8 h-8 rounded-full hover:bg-gray-700 object-cover absolute top-5 right-6"
                    />
                    <div
                        className="p-4 overflow-y-auto"
                        style={{ height: "73%" }}
                    >
                        {comments.map((cmnt) => {
                            return (
                                <CommentBubble comment={cmnt} key={cmnt._id} />
                            );
                        })}
                    </div>
                    <CreateComment />
                </div>
            </dialog>
        </>
    );
}

CommentsList.propTypes = {
    postID: stringProp,
};
