import EditPostButton from "./EditPostButton";
import DeletePostButton from "./DeletePostButton";
import { useUserContext } from "../../../contexts/user";
import { usePostContext } from "../../../contexts/post";

export default function PostCardMenu() {
    const { user } = useUserContext();
    const { post } = usePostContext();

    return (
        <>
            {user._id === post?.author._id ? (
                <div className="dropdown absolute top-1 right-2">
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
                            <EditPostButton />
                        </li>
                        <li>
                            <DeletePostButton />
                        </li>
                    </ul>
                </div>
            ) : null}
        </>
    );
}
