import { Link } from "react-router-dom";
import useAuthFetch from "../../../hooks/useAuthFetch";
import Spinner from "../../../components/spinners/Spinner";
import SectionList from "./SectionList";
import { arrayProp } from "../../../utils/propTypes";

export default function PendingRequestsSection() {
    const {
        loading,
        error,
        resp: pendingRequests,
    } = useAuthFetch("/api/v1/friends/pending-requests");

    return (
        <div className="hidden w-full p-3 lg:flex flex-col gap-3 mb-6">
            <h1 className="text-gray-200 text-md lg:text-lg font-bold">
                Pending Requests
            </h1>
            <hr />
            {loading && <Spinner />}
            {error && (
                <p className="font-medium text-red-900 bg-red-200 w-full p-3 rounded-lg">
                    {error}
                </p>
            )}
            {pendingRequests && <SectionList data={pendingRequests} />}
            {!loading && <ViewMoreButton pendingRequests={pendingRequests} />}
        </div>
    );
}

function ViewMoreButton({ pendingRequests }) {
    return (
        <>
            {pendingRequests && pendingRequests.length > 0 ? (
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
        </>
    );
}

ViewMoreButton.propTypes = {
    pendingRequests: arrayProp,
};
