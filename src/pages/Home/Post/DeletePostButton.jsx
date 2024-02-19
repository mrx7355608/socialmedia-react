import { usePostContext } from "../../../contexts/post";

export default function DeletePostButton() {
    const { post } = usePostContext();

    return (
        <div onClick={showDeletePostModal} className="text-red-400">
            Delete
        </div>
    );

    function showDeletePostModal() {
        document.getElementById(`delete_post_${post?._id}`).showModal();
    }
}
