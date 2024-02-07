import { Link } from "react-router-dom";

export default function Sidebar() {
    const links = [
        {
            path: "/",
            iconURL: "/home.png",
            title: "Home",
        },
        {
            path: "/friends",
            iconURL: "/friends.png",
            title: "Friends",
        },
        {
            path: "/profile",
            iconURL: "/profile.png",
            title: "Profile",
        },
        {
            path: "/settings",
            iconURL: "/settings.png",
            title: "Settings",
        },
    ];
    return (
        <div className="hidden lg:flex flex-col p-4 bg-gray-900 h-screen w-1/4">
            <UserPictureAndName />
            {links.map((link, index) => {
                return (
                    <Link to={link.path} key={index}>
                        <div className="bg-transparent flex items-center gap-3 w-full border-none w-full outline-none rounded-lg p-3 hover:bg-gray-800">
                            <img
                                src={link.iconURL}
                                alt="link"
                                className="w-5"
                            />
                            <p className="text-gray-200">{link.title}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

function UserPictureAndName() {
    return (
        <div className="p-3 rounded-lg">
            <img
                src="/logo.png"
                alt="user profile picture"
                className="w-8 fit-cover inline mr-3 rounded-full border border-gray-300"
            />
            <span className="text-gray-300 font-medium">Fawad Imran</span>
        </div>
    );
}
