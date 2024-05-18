import { useState } from "react";
import Spinner from "../../components/spinners/Spinner";
import { ErrorToast } from "../../components/toasts";
import { funcProp, stringProp } from "../../utils/propTypes";
import FriendServices from "../../api/friends";

export default function RejectReqBtn({ requestID, updatePendingRequests }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const friendServices = FriendServices();

    return (
        <>
            {loading ? (
                <button className="flex-1 btn btn-ghost">
                    <Spinner />
                </button>
            ) : (
                <button
                    onClick={rejectRequest}
                    className="flex-1 btn btn-ghost"
                >
                    Reject
                </button>
            )}
            {apiError ? <ErrorToast error={apiError} /> : null}
        </>
    );

    async function rejectRequest() {
        try {
            setLoading(true);
            const response = await friendServices.rejectRequest(requestID);
            if (response.ok) {
                updatePendingRequests(response.data);
            } else {
                setApiError(response.error);
                setTimeout(() => setApiError(""), 4000);
            }
        } catch (err) {
            setApiError("An un-expected error occurred");
            setTimeout(() => setApiError(""), 4000);
        } finally {
            setLoading(false);
        }
    }
}

RejectReqBtn.propTypes = {
    requestID: stringProp,
    updatePendingRequests: funcProp,
};
