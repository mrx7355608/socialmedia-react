import { stringProp } from "../../utils/propTypes";

export default function AddFriendCard({ user }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 w-full">
            <div>
                <img
                    src={user.profilePicture}
                    alt="profile picture"
                    className="w-10 h-10 rounded-full object-cover inline mr-4"
                />
                <p className="text-gray-200 font-medium inline">
                    {user.fullname}
                </p>
            </div>
            <button className="btn btn-accent">Add Friend</button>
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
