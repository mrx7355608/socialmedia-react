import { useUserContext } from "../../contexts/user";
import { usePostContext } from "../../contexts/post";

export default function PostCardMenu() {
    const { user } = useUserContext();
    const { post } = usePostContext();

    return (
        <>
            {isUserAuthorOfPost() ? (
                <div className="dropdown dropdown-end absolute top-1 right-2">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost m-1 rounded-full"
                    >
                        <img
                            src="/menu.png"
                            alt="menu icon"
                            className="w-5 h-5 object-cover rounded-full rotate-90"
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-md bg-gray-700 rounded-box w-52"
                    >
                        <li>
                            <div onClick={showEditPostModal}>Edit</div>
                        </li>
                        <li>
                            <div
                                onClick={showDeletePostModal}
                                className="text-red-400"
                            >
                                Delete
                            </div>
                        </li>
                    </ul>
                </div>
            ) : null}
        </>
    );

    function isUserAuthorOfPost() {
        return user?._id === post?.author._id;
    }
    function showEditPostModal() {
        document.getElementById(`edit_post_${post?._id}`).showModal();
    }
    function showDeletePostModal() {
        document.getElementById(`delete_post_${post?._id}`).showModal();
    }
}
