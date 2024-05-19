import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/spinners/Spinner";
import { ErrorMessage } from "../../components/error";
import { PendingRequestsList } from "../../components/pending_requests";

export default function PendingRequests() {
    const { loading, error, resp } = useFetch(
        "/api/v1/friends/pending-requests"
    );

    return (
        <div className="flex flex-col items-center justify-start p-3 w-full lg:w-1/3 mx-auto">
            <h1 className="font-bold text-gray-200 text-left text-3xl p-4 my-4 mb-7">
                Pending Requests
            </h1>
            {loading && <Spinner />}
            {error && <ErrorMessage errorMessage={error} />}
            {resp && <PendingRequestsList resp={resp} />}
        </div>
    );
}
