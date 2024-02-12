import { Link } from "react-router-dom";
import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../Spinner";
import ErrorBox from "./ErrorBox";
import List from "./List";
import { arrayProp } from "../../utils/propTypes";

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
            <ErrorBox error={error} />
            <List content={friends} />
            {!loading && <ViewMoreButton friends={friends} />}
        </div>
    );
}

function ViewMoreButton({ friends }) {
    return (
        <>
            {friends && friends.length > 0 ? (
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
        </>
    );
}

ViewMoreButton.propTypes = {
    friends: arrayProp,
};
