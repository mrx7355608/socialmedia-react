import { Link } from "react-router-dom";
import useAuthFetch from "../../../hooks/useAuthFetch";
import Spinner from "../../../components/spinners/Spinner";
import SectionList from "./SectionList";
import { arrayProp } from "../../../utils/propTypes";

export default function FriendsSection() {
    const { loading, error, resp: friends } = useAuthFetch("/api/v1/friends");

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
            {friends && <SectionList data={friends} />}
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
