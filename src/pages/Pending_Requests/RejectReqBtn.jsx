import { useState } from "react";
import Spinner from "../../components/Spinner";
import { ErrorToast } from "../../components/Toasts";
import { funcProp, stringProp } from "../../utils/propTypes";

export default function RejectReqBtn({ requestID, updatePendingRequests }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

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
        setLoading(true);
        const url = `http://localhost:8000/friends/reject-request/${requestID}`;
        const options = {
            method: "PATCH",
            credentials: "include",
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);
            if (result.ok) {
                updatePendingRequests(result.data);
            } else {
                setApiError(result.error);
            }
        } catch (err) {
            setApiError("An un-expected error occurred");
            setLoading(false);
        }
    }
}

RejectReqBtn.propTypes = {
    requestID: stringProp,
    updatePendingRequests: funcProp,
};
