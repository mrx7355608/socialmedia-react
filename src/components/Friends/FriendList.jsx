import UserPictureAndName from "../UserProfilePictureAndName";

export default function FriendList() {
    const friends = [
        {
            profilePicture: "/logo.png",
            name: "Fawad Imran",
        },
        {
            profilePicture: "/logo.png",
            name: "Abdul Wasay",
        },
        {
            profilePicture: "/logo.png",
            name: "Hamza Ali",
        },
        {
            profilePicture: "/logo.png",
            name: "Asmeer Ahmed",
        },
        {
            profilePicture: "/logo.png",
            name: "Talha Khan",
        },
        {
            profilePicture: "/logo.png",
            name: "Sharjeel Ahmed",
        },
    ];
    return (
        <div className="hidden w-full p-3 lg:flex flex-col gap-3">
            <h1 className="text-gray-200 text-lg font-bold">Friends</h1>
            <hr />
            {friends.map((friend, idx) => {
                return <UserPictureAndName user={friend} key={idx} />;
            })}
        </div>
    );
}
