import Spinner from "../../components/Spinner";
import { stringProp } from "../../utils/propTypes";
import useAddFriend from "./useAddFriend";
import { SuccessToast, ErrorToast } from "../../components/Toasts";
import { useState } from "react";

export default function AddFriendCard({ user }) {
    const { loading, apiError, sendFriendRequest } = useAddFriend();
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 w-full">
            <div className="flex">
                <img
                    src={user.profilePicture}
                    alt="profile picture"
                    className="w-16 h-16 rounded-full object-cover inline mr-4"
                />
                <div>
                    <p className="text-gray-300 font-medium text-lg mb-0">
                        {user.fullname}
                    </p>

                    {user.bio ? (
                        <p className="text-gray-400 text-md mt-0">{user.bio}</p>
                    ) : (
                        <i className="text-gray-400 text-md mt-0">
                            No bio provided
                        </i>
                    )}
                </div>
            </div>
            <button
                onClick={onClickHandler}
                className={`btn btn-accent ${loading && "disabled"}`}
            >
                {loading ? <Spinner /> : "Add Friend"}
            </button>
            {apiError && <ErrorToast error={apiError} />}
            {showSuccessToast && (
                <SuccessToast success="Request sent successfully!" />
            )}
        </div>
    );

    async function onClickHandler() {
        const isSuccess = await sendFriendRequest(user._id);
        if (isSuccess) {
            setShowSuccessToast(true);
        }
    }
}

AddFriendCard.propTypes = {
    user: {
        _id: stringProp,
        fullname: stringProp,
        bio: stringProp,
        profilePicture: stringProp,
    },
};
