import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../spinners/Spinner";
import { useUserContext } from "../../contexts/user";
import { AuthServices } from "../../api/auth";
import { ErrorToast } from "../toasts";

export default function Sidebar() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user, setUser } = useUserContext();
    const authServices = AuthServices();

    async function logout() {
        try {
            setLoading(true);
            const response = await authServices.logout();
            if (!response.ok) {
                return setError(response.data.error);
            }
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

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
            path: "/pending-requests",
            iconURL: "/pending.png",
            title: "Pending Requests",
        },
        {
            path: "/profile",
            iconURL: "/profile.png",
            title: "Profile",
        },
    ];
    return (
        <div className="hidden lg:flex fixed left-0 flex-col p-4 h-screen w-1/4">
            <div className="p-3 rounded-lg w-full">
                <img
                    src={user?.profilePicture}
                    alt=""
                    className="w-8 h-8 fit-cover inline mr-3 rounded-full border border-gray-300 object-cover"
                />
                <span className="text-gray-300 font-medium">
                    {user?.fullname}
                </span>
            </div>
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
            {error && <ErrorToast error={error} />}
        </div>
    );
}
