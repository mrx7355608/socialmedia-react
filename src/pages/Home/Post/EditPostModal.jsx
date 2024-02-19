import { usePostContext } from "../../../contexts/post";

export default function EditPostModal() {
    const { post } = usePostContext();
    return (
        <dialog id={`edit_post_${post?._id}`} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Click the button below to close</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
