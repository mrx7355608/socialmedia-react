import { useState } from "react";
import Spinner from "../../components/spinners/Spinner";
import { funcProp, stringProp } from "../../utils/propTypes";
import { ErrorToast } from "../../components/toasts";
import FriendServices from "../../api/friends";

export default function AcceptReqBtn({ requestID, updatePendingRequests }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const friendServices = FriendServices();

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
        try {
            setLoading(true);
            const response = await friendServices.acceptRequest(requestID);
            setLoading(false);
            if (response.data.ok) {
                updatePendingRequests(response.data.data);
            } else {
                setApiError(response.data.error);
            }
        } catch (err) {
            setApiError("An un-expected error occurred");
        } finally {
            setLoading(false);
        }
    }
}

AcceptReqBtn.propTypes = {
    requestID: stringProp,
    updatePendingRequests: funcProp,
};
