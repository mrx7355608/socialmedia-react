import { usePostContext } from "../../../contexts/post";

export default function EditPostButton() {
    const { post } = usePostContext();

    return <div onClick={showEditPostModal}>Edit</div>;

    function showEditPostModal() {
        document.getElementById(`edit_post_${post?._id}`).showModal();
    }
}
