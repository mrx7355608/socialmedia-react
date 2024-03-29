import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../../components/Spinner";
import PendingRequestCard from "./PendingRequestCard";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/user";

export default function PendingRequests() {
    const { user, setUser } = useUserContext();
    const [myRequests, setMyPendingRequests] = useState([]);
    const { loading, error, resp } = useAuthFetch(
        "/api/v1/friends/pending-requests"
    );

    useEffect(() => {
        if (resp) {
            setMyPendingRequests(resp);
        }
    }, [resp]);

    if (loading) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <p className="text-red-400 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start p-3 w-full lg:w-1/3 mx-auto">
            <h1 className="font-bold text-gray-200 text-left text-3xl p-4 my-4 mb-7">
                Pending Requests
            </h1>
            {myRequests.map((req) => {
                return (
                    <PendingRequestCard
                        request={req}
                        key={req._id}
                        updatePendingRequests={updatePendingRequestsStateValue}
                    />
                );
            })}
        </div>
    );

    function updatePendingRequestsStateValue(newState) {
        setMyPendingRequests(newState);
        setUser({ ...user, pending_requests: newState });
    }
}
