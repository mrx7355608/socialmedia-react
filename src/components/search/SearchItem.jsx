import { stringProp } from "../../utils/propTypes";
import AddFriendButton from "./AddFriendButton";

export default function SearchItem({ searchedUser }) {
    return (
        <div className="flex items-center justify-between p-3 bg-myGray rounded-lg w-full">
            <div className="flex">
                <img
                    src={searchedUser.profilePicture}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full object-cover inline mr-4"
                />
                <div>
                    <p className="text-gray-300 font-medium text-lg mb-0">
                        {searchedUser.fullname}
                    </p>

                    {searchedUser.bio ? (
                        <p className="text-gray-400 text-md mt-0">
                            {searchedUser.bio}
                        </p>
                    ) : (
                        <i className="text-gray-400 text-md mt-0">
                            No bio provided
                        </i>
                    )}
                </div>
            </div>
            <AddFriendButton userID={searchedUser._id} />
        </div>
    );
}

SearchItem.propTypes = {
    searchedUser: {
        _id: stringProp,
        fullname: stringProp,
        bio: stringProp,
        profilePicture: stringProp,
    },
};
