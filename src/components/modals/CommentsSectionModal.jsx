import { MdClose } from "react-icons/md";
import Spinner from "../spinners/Spinner";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { stringProp } from "../../utils/propTypes";
import { CommentForm, CommentsList } from "../comments";
import useCommentsStore from "../../store/comments.store";

export default function CommentsSectionModal({ postID }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const setComments = useCommentsStore((state) => state.setComments);

    const getComments = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/comments/${postID}`, {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((result) => setComments(result.data))
            .catch(() => setError("An un-expected error occurred"))
            .finally(() => setLoading(false));
    };

    // Fetch comments from server and update comments context
    useEffect(() => {
        if (isModalVisible) {
            getComments();
        }
    }, [isModalVisible]);

    return (
        <>
            <button className="btn btn-ghost flex-1" onClick={openModal}>
                <FaRegComment size={20} />
                Comment
            </button>

            {/* Modal */}
            <dialog
                id={`my_modal_${postID}`}
                className="modal p-0 mx-auto"
                style={{ width: "95vw" }}
            >
                <div
                    className="modal-box w-full lg:w-11/12 lg:max-w-4xl p-0 relative"
                    style={{ height: "90vh" }}
                >
                    <h3 className="font-bold text-xl text-center mb-9 mt-5">
                        Comments
                    </h3>

                    {/* Modal close button */}
                    <MdClose
                        onClick={closeModal}
                        className="hover:cursor-pointer p-2 w-8 h-8 rounded-full hover:bg-gray-700 object-cover absolute top-5 right-6"
                    />

                    {/* List of comments */}
                    {loading ? (
                        <div className="flex items-center justify-center mx-auto h-1/2">
                            <Spinner />
                        </div>
                    ) : error ? (
                        <p className="text-red-400 text-lg mt-8">{error}</p>
                    ) : (
                        <CommentsList />
                    )}

                    {/* Form for creating comments */}
                    <CommentForm />
                </div>
            </dialog>
        </>
    );

    function closeModal() {
        document.getElementById(`my_modal_${postID}`).close();
        setIsModalVisible(false);
    }

    function openModal() {
        setIsModalVisible(true);
        document.getElementById(`my_modal_${postID}`).showModal();
    }
}

CommentsSectionModal.propTypes = {
    postID: stringProp,
};
