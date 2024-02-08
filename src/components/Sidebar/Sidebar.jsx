import { Link } from "react-router-dom";
import UserPictureAndName from "../UserProfilePictureAndName";
import { useState } from "react";
import Spinner from "../Spinner";
import { useUserContext } from "../../contexts/user";

export default function Sidebar() {
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserContext();

    const logout = () => {
        setLoading(true);
        fetch("http://localhost:8000/auth/logout", {
            method: "POST",
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (!data.ok) throw new Error(data.error);
                setUser(null);
            })
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
    };
    const user = {
        profilePicture: "/logo.png",
        name: "Fawad Imran",
    };
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
        <div className="hidden lg:flex fixed left-0 flex-col p-4 bg-gray-900 h-screen w-1/4">
            <UserPictureAndName user={user} />
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
            <div
                onClick={logout}
                className="flex items-center p-3 rounded-lg hover:bg-gray-800 hover:cursor-pointer"
            >
                <img
                    src="/logout.png"
                    alt="logout button"
                    className="w-4 inline mr-3"
                />
                <span className=" text-gray-300">
                    {loading ? <Spinner /> : "Logout"}
                </span>
            </div>
        </div>
    );
}
