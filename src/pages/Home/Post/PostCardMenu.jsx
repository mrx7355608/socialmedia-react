import EditPostButton from "./EditPostButton";
import DeletePostButton from "./DeletePostButton";

export default function PostCardMenu() {
    return (
        <div className="dropdown absolute top-1 right-1">
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
    );
}
