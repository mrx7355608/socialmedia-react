// import CommentBubble from "./SingleComment";
import CreateComment from "./Create";
// import { useEffect, useState } from "react";
// import useAuthFetch from "../../../hooks/useAuthFetch";
// import Spinner from "../../../components/Spinner";
import { booleanProp, funcProp } from "../../../utils/propTypes";
import { usePostContext } from "../../../contexts/post";
import { useEffect, useRef } from "react";

export default function CommentsList({ showComments, setShowComments }) {
    const { post } = usePostContext();
    const modalRef = useRef(null);

    useEffect(() => {
        if (showComments) {
            console.log("fetching comments for post", post?._id);
        }
    }, [showComments, post?._id]);

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center mx-auto w-1/2 h-full">
    //             <Spinner />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
    //             <p className="text-red-400 text-lg">{error}</p>
    //         </div>
    //     );
    // }

    return (
        <>
            <dialog
                ref={modalRef}
                id={`my_modal_${post?._id}`}
                className="modal p-0"
            >
                <div
                    className="modal-box w-11/12 max-w-4xl p-0 relative"
                    style={{ height: "90vh" }}
                >
                    <h3 className="font-bold text-xl text-center mb-9 mt-5">
                        Comments
                    </h3>

                    {/* Modal close button */}
                    <img
                        src="/close.png"
                        alt="close cross icon"
                        onClick={() => {
                            document
                                .getElementById(`my_modal_${post?._id}`)
                                .close();
                            setShowComments(false);
                        }}
                        className="hover:cursor-pointer p-2 w-8 h-8 rounded-full hover:bg-gray-700 object-cover absolute top-5 right-6"
                    />

                    {/* Comments */}
                    {/* <div
                        className="p-4 overflow-y-auto"
                        style={{ height: "73%" }}
                    >
                        {comments.map((cmnt) => {
                            return (
                                <CommentBubble comment={cmnt} key={cmnt._id} />
                            );
                        })}
                    </div> */}

                    {/* Input for creating comments */}
                    <CreateComment />
                </div>
            </dialog>
        </>
    );
}

CommentsList.propTypes = {
    showComments: booleanProp,
    setShowComments: funcProp,
};
