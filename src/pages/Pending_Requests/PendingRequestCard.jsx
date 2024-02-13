import { useState } from "react";
import { funcProp, stringProp } from "../../utils/propTypes";
import Spinner from "../../components/Spinner";
import { ErrorToast, SuccessToast } from "../../components/Toasts";

export default function PendingRequestCard({ request, updatePendingRequests }) {
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [acceptSuccess, setAcceptSuccess] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    return (
        <div className="flex flex-col items-start justify-center p-4 rounded-lg bg-gray-800 shadow w-full mb-3">
            <div className="flex items-center">
                <img
                    src={request.profilePicture}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full object-cover inline mr-3"
                />
                <p className="text-gray-300 font-medium text-lg mb-0">
                    {request.fullname}
                </p>
            </div>
            <div className="flex w-full gap-2 mt-4">
                <button
                    onClick={async () => await acceptRequest(request._id)}
                    className={`flex-1 btn btn-accent ${
                        acceptLoading && "disabled"
                    }`}
                >
                    {acceptLoading ? <Spinner /> : "Accept"}
                </button>
                <button
                    onClick={async () => await rejectRequest(request._id)}
                    className={`flex-1 btn btn-ghost ${
                        rejectLoading && "disabled"
                    }`}
                >
                    {rejectLoading ? <Spinner /> : "Reject"}
                </button>
            </div>

            {apiError && <ErrorToast error={apiError} />}
            {acceptSuccess && <SuccessToast success="Request accepted!" />}
        </div>
    );

    async function acceptRequest(requestID) {
        setAcceptLoading(true);
        const url = `http://localhost:8000/friends/accept-request/${requestID}`;
        const options = {
            method: "PATCH",
            credentials: "include",
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setAcceptLoading(false);
            if (result.ok) {
                setAcceptSuccess(true);
                return updatePendingRequests(result.data);
            }
            setApiError(result.error);
        } catch (err) {
            setApiError("An un-expected error occurred");
            setAcceptLoading(false);
        }
    }
    async function rejectRequest(requestID) {}
}

PendingRequestCard.propTypes = {
    request: {
        _id: stringProp,
        fullname: stringProp,
        profilePicture: stringProp,
    },
    updatePendingRequests: funcProp,
};
