import { useState } from "react";
import { funcProp, stringProp } from "../../utils/propTypes";
import { ErrorToast } from "../../components/Toasts";
import Spinner from "../../components/Spinner";

export default function FriendDisplayCard({ friend, updateFriendsStateValue }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 shadow w-full mb-3">
            <div className="flex items-center">
                <img
                    src={friend.profilePicture}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full object-cover inline mr-3"
                />
                <p className="text-gray-300 font-medium text-lg mb-0">
                    {friend.fullname}
                </p>
            </div>
            {loading ? (
                <button className="btn btn-error">
                    <Spinner />
                </button>
            ) : (
                <button className="btn btn-error" onClick={removeFriend}>
                    Remove
                </button>
            )}
            {apiError && <ErrorToast error={apiError} />}
        </div>
    );

    async function removeFriend() {
        const url = `http://localhost:8000/friends/remove-friend/${friend._id}`;
        const options = {
            method: "PATCH",
            credentials: "include",
        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);

            if (result.ok) {
                updateFriendsStateValue(result.data);
            } else {
                setApiError(result.error);
            }
        } catch (err) {
            setLoading(false);
            setApiError("An un-expected error occurred");
        }
    }
}

FriendDisplayCard.propTypes = {
    friend: {
        _id: stringProp,
        fullname: stringProp,
        profilePicture: stringProp,
    },
    updateFriendsStateValue: funcProp,
};
