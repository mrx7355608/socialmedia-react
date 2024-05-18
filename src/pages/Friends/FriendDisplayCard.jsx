import { useState } from "react";
import { funcProp, stringProp } from "../../utils/propTypes";
import { ErrorToast } from "../../components/toasts";
import Spinner from "../../components/spinners/Spinner";
import { useUserContext } from "../../contexts/user";
import FriendServices from "../../api/friends";

export default function FriendDisplayCard({ friend, updateFriendsStateValue }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const friendServices = FriendServices();
    const { user, setUser } = useUserContext();

    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 shadow w-full mb-3">
            <div className="flex items-center">
                <img
                    src={friend.profilePicture}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full object-cover inline mr-3"
                />
                <p className="text-md font-bold lg:text-lg text-gray-300 mb-0">
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
        try {
            setLoading(true);
            const response = await friendServices.remove(friend._id);

            if (response.ok) {
                updateFriendsStateValue(response.data);
                setUser({ ...user, friends: response.data });
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

FriendDisplayCard.propTypes = {
    friend: {
        _id: stringProp,
        fullname: stringProp,
        profilePicture: stringProp,
    },
    updateFriendsStateValue: funcProp,
};
