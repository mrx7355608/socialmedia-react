export default function UserPictureAndName({ user }) {
    return (
        <div className="p-3 rounded-lg">
            <img
                src={user?.profilePicture}
                alt="user profile picture"
                className="w-8 h-8 fit-cover inline mr-3 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-gray-300 font-medium">{user?.fullname}</span>
        </div>
    );
}
