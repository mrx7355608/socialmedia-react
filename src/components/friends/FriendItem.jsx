import { useState } from "react";
import { funcProp, stringProp } from "../../utils/propTypes";
import { Spinner } from "../spinners";
import { ErrorToast } from "../toasts";
import FriendServices from "../../api/friends";
import { useUserContext } from "../../contexts/user";

export default function FriendItem({ friend, filterFriendList }) {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const { user, setUser } = useUserContext();
    const friendServices = FriendServices();

    return (
        <div
            className="flex-1 bg-myGray p-4 rounded-lg"
            style={{ minWidth: "250px" }}
        >
            <div className="flex items-center justify-between rounded-lg ">
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

                <button
                    className="btn btn-error btn-outline rounded-full px-5 btn-sm"
                    onClick={removeFriend}
                >
                    {loading ? <Spinner /> : "Remove"}
                </button>
                {apiError && <ErrorToast error={apiError} />}
            </div>
            <hr className="border-gray-700 mt-4" />
        </div>
    );

    async function removeFriend() {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const response = await friendServices.remove(friend._id);
            if (response.error) {
                setApiError(response.error);
            } else {
                filterFriendList(friend._id); // Remove friend from list
                setUser({ ...user, friends: response.data }); // Update user object
            }
        } catch (err) {
            setApiError("An un-expected error occurred");
        } finally {
            setLoading(false);
        }
    }
}

FriendItem.propTypes = {
    friend: {
        _id: stringProp,
        fullname: stringProp,
        profilePicture: stringProp,
    },
    filterFriendList: funcProp,
};
