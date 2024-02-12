import { Link } from "react-router-dom";
import UserPictureAndName from "../UserProfilePictureAndName";
import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../Spinner";

export default function FriendList() {
    const {
        loading,
        error,
        resp: friends,
    } = useAuthFetch("http://localhost:8000/friends");

    return (
        <div className="hidden w-full p-3 lg:flex flex-col gap-3 mb-6">
            <h1 className="text-gray-200 text-lg font-bold">Friends</h1>
            <hr />
            {loading && <Spinner />}
            {error && (
                <p className="font-medium text-red-900 bg-red-200 w-full p-3 rounded-lg">
                    {error}
                </p>
            )}
            {friends &&
                friends.map((friend, idx) => {
                    return <UserPictureAndName user={friend} key={idx} />;
                })}
            {friends && friends.length > 5 ? (
                <Link
                    to="/friends"
                    className="text-center text-blue-300 hover:underline"
                >
                    {" "}
                    View More...
                </Link>
            ) : (
                <p className="text-gray-400">No friends to show</p>
            )}
        </div>
    );
}
