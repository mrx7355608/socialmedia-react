import { useState } from "react";
import Spinner from "../../components/Spinner";
import { funcProp, stringProp } from "../../utils/propTypes";
import { ErrorToast } from "../../components/Toasts";

export default function AcceptReqBtn({ requestID, updatePendingRequests }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    return (
        <>
            {loading ? (
                <button className="flex-1 btn btn-accent">
                    <Spinner />
                </button>
            ) : (
                <button
                    onClick={async () => await acceptRequest()}
                    className="flex-1 btn btn-accent"
                >
                    Accept
                </button>
            )}
            {apiError ? <ErrorToast error={apiError} /> : null}
        </>
    );

    async function acceptRequest() {
        setLoading(true);
        const url = `/api/v1/friends/accept-request/${requestID}`;
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

AcceptReqBtn.propTypes = {
    requestID: stringProp,
    updatePendingRequests: funcProp,
};
