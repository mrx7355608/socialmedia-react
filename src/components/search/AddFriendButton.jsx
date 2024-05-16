import Spinner from "../../components/spinners/Spinner";
import { SuccessToast, ErrorToast } from "../../components/Toasts";
import { useState } from "react";
import { useUserContext } from "../../contexts/user";
import { stringProp } from "../../utils/propTypes";
import UserServices from "../../api/user";

export default function AddFriendButton({ userID }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const { user } = useUserContext();
    const userServices = UserServices();

    return (
        <>
            {/* Add friend button */}
            {isInPendingRequests() || isFriend() || isUserHimself() ? null : (
                <button
                    onClick={onClickHandler}
                    className={`btn btn-accent ${loading && "disabled"}`}
                >
                    {loading ? <Spinner /> : "Add Friend"}
                </button>
            )}

            {/* Success & Error toasts */}
            {apiError && <ErrorToast error={apiError} />}
            {showSuccessToast && (
                <SuccessToast success="Request sent successfully!" />
            )}
        </>
    );

    async function onClickHandler() {
        try {
            setLoading(true);
            const response = await userServices.sendFriendRequest(userID);
            if (response.ok) {
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 4000);
            } else {
                setApiError(response.error);
            }
        } catch (err) {
            setApiError("An un-exepcted error occured");
        } finally {
            setLoading(false);
        }
    }

    function isInPendingRequests() {
        return user?.pending_requests.includes(userID);
    }
    function isFriend() {
        return user?.friends.includes(userID);
    }
    function isUserHimself() {
        return user?._id === userID;
    }
}
AddFriendButton.propTypes = {
    userID: stringProp,
};
