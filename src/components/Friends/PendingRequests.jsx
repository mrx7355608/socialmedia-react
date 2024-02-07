import { Link } from "react-router-dom";
import UserPictureAndName from "../UserProfilePictureAndName";

export default function PendingRequestsList() {
    const pendingRequests = [
        {
            _id: 1,
            profilePicture: "/logo.png",
            name: "Maaz Ahmed",
        },
        {
            _id: 2,
            profilePicture: "/logo.png",
            name: "Kashif Khan",
        },
        {
            _id: 3,
            profilePicture: "/logo.png",
            name: "Farooq Haider",
        },
    ];
    return (
        <div className="hidden w-full p-3 lg:flex flex-col gap-3 mb-6">
            <h1 className="text-gray-200 text-lg font-bold">
                Pending Requests
            </h1>
            <hr />
            {pendingRequests.map((req) => {
                return <UserPictureAndName user={req} key={req._id} />;
            })}
            <Link
                to="/pending-requests"
                className="text-center text-blue-300 hover:underline"
            >
                {" "}
                View More...
            </Link>
        </div>
    );
}
