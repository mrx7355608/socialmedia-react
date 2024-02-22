import { useUserContext } from "../../contexts/user";

export default function Profile() {
    const { user } = useUserContext();

    return (
        <div className="flex flex-col px-2.5 py-4 justify-start items-center">
            {/* Cover picture */}
            <img
                src={user.coverPicture}
                alt="user cover picture"
                className="w-full object-cover rounded-lg mb-10"
            />
            {/* Profile picture and Fullname */}
            <div className="flex p-3 rounded-lg w-full">
                <img
                    src={user.profilePicture}
                    alt="user profile picture"
                    className="w-20 h-20 fit-cover inline mr-3 rounded-full border border-gray-300 object-cover"
                />
                <div>
                    <p className="text-gray-300 font-medium text-lg">
                        {user.fullname}
                    </p>
                    {user.bio ? (
                        <p className="text-gray-400 text-sm">{user.bio}</p>
                    ) : (
                        <i className="text-gray-400 text-md mt-0">
                            No bio provided
                        </i>
                    )}
                </div>
            </div>
            {/* Bio */}
            {/* Friends */}
            {/* Posts */}
        </div>
    );
}
