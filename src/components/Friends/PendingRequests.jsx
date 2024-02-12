import { Link } from "react-router-dom";
import UserPictureAndName from "../UserProfilePictureAndName";
import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../Spinner";

export default function PendingRequestsList() {
    const {
        loading,
        error,
        resp: pendingRequests,
    } = useAuthFetch("http://localhost:8000/friends/pending-requests");

    return (
        <div className="hidden w-full p-3 lg:flex flex-col gap-3 mb-6">
            <h1 className="text-gray-200 text-lg font-bold">
                Pending Requests
            </h1>
            <hr />
            {loading && <Spinner />}
            {error && (
                <p className="font-medium text-red-900 bg-red-200 w-full p-3 rounded-lg">
                    {error}
                </p>
            )}
            {pendingRequests &&
                pendingRequests.map((req) => {
                    return <UserPictureAndName user={req} key={req._id} />;
                })}
            {pendingRequests && pendingRequests.length > 4 ? (
                <Link
                    to="/pending-requests"
                    className="text-center text-blue-300 hover:underline"
                >
                    {" "}
                    View More...
                </Link>
            ) : (
                <p className="text-gray-400">No requests to show</p>
            )}
        </div>
    );
}
