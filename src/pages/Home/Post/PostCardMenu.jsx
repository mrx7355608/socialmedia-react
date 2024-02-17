import EditPostButton from "./EditPostButton";
import DeletePostButton from "./DeletePostButton";
import { funcProp, stringProp } from "../../../utils/propTypes";

export default function PostCardMenu({ postID, removePostFromTimeline }) {
    return (
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
                    <DeletePostButton
                        removePostFromTimeline={removePostFromTimeline}
                        postID={postID}
                    />
                </li>
            </ul>
        </div>
    );
}

PostCardMenu.propTypes = {
    postID: stringProp,
    removePostFromTimeline: funcProp,
};
