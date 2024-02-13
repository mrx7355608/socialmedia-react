import Spinner from "../../components/Spinner";
import { stringProp } from "../../utils/propTypes";
import useAddFriend from "./useAddFriend";

export default function AddFriendCard({ user }) {
    const { loading, sendFriendRequest } = useAddFriend();

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
                onClick={sendFriendRequest}
                className={`btn btn-accent ${loading && "disabled"}`}
            >
                {loading ? <Spinner /> : "Add Friend"}
            </button>
        </div>
    );
}

AddFriendCard.propTypes = {
    user: {
        fullname: stringProp,
        bio: stringProp,
        profilePicture: stringProp,
    },
};
