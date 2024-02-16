import Spinner from "../../components/Spinner";
import { stringProp } from "../../utils/propTypes";
import useAddFriend from "./useAddFriend";
import { SuccessToast, ErrorToast } from "../../components/Toasts";
import { useState } from "react";
import { useUserContext } from "../../contexts/user";

export default function AddFriendCard({ friend }) {
    const { loading, apiError, sendFriendRequest } = useAddFriend();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const { user } = useUserContext();

    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 w-full">
            <div className="flex">
                <img
                    src={friend.profilePicture}
                    alt="profile picture"
                    className="w-16 h-16 rounded-full object-cover inline mr-4"
                />
                <div>
                    <p className="text-gray-300 font-medium text-lg mb-0">
                        {friend.fullname}
                    </p>

                    {friend.bio ? (
                        <p className="text-gray-400 text-md mt-0">
                            {friend.bio}
                        </p>
                    ) : (
                        <i className="text-gray-400 text-md mt-0">
                            No bio provided
                        </i>
                    )}
                </div>
            </div>
            {user &&
            (user.pending_requests.includes(friend._id) ||
                user.friends.includes(friend._id) ||
                user._id === friend._id) ? null : (
                <button
                    onClick={onClickHandler}
                    className={`btn btn-accent ${loading && "disabled"}`}
                >
                    {loading ? <Spinner /> : "Add Friend"}
                </button>
            )}
            {apiError && <ErrorToast error={apiError} />}
            {showSuccessToast && (
                <SuccessToast success="Request sent successfully!" />
            )}
        </div>
    );

    async function onClickHandler() {
        const isSuccess = await sendFriendRequest(friend._id);
        if (isSuccess) {
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 4000);
        }
    }
}

AddFriendCard.propTypes = {
    friend: {
        _id: stringProp,
        fullname: stringProp,
        bio: stringProp,
        profilePicture: stringProp,
    },
};
