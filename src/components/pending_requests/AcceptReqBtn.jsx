import { useState } from "react";
import Spinner from "../spinners/Spinner";
import { funcProp, stringProp } from "../../utils/propTypes";
import { ErrorToast } from "../toasts";
import FriendServices from "../../api/friends";

export default function AcceptReqBtn({ requestID, removeRequestFromList }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const friendServices = FriendServices();

    return (
        <>
            {loading ? (
                <button className="flex-1 btn btn-primary">
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
            if (response.ok) {
                removeRequestFromList(requestID);
            } else {
                setApiError(response.error);
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
    removeRequestFromList: funcProp,
};
