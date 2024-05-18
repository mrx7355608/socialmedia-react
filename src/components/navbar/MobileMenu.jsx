import { NavLink } from "react-router-dom";
import { useState } from "react";
import Spinner from "../spinners/Spinner";
import { useUserContext } from "../../contexts/user";
import { AuthServices } from "../../api/auth";
import { ErrorToast } from "../toasts";

export default function MobileMenu() {
    const authServices = AuthServices();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user, setUser } = useUserContext();
    const links = [
        {
            path: "/",
            iconURL: "/home.png",
        },
        {
            path: "/friends",
            iconURL: "/friends.png",
        },
        {
            path: "/pending-requests",
            iconURL: "/pending.png",
        },
    ];
    const activeClass =
        "relative btn bg-gray-700 border-none w-full flex-1 outline-none";
    const notActiveClass =
        "relative btn bg-transparent border-none w-full outline-none flex-1 hover:bg-gray-700";

    return (
        <div className="flex w-full gap-2 p-1 bg-gray-800 border-gray-700 border-t fixed shadow-md z-20 lg:hidden">
            {links.map((link, index) => {
                return (
                    <NavLink
                        to={link.path}
                        key={index}
                        className={(navData) => {
                            return navData.isActive
                                ? activeClass
                                : notActiveClass;
                        }}
                    >
                        <img src={link.iconURL} alt="link" className="w-5" />
                        {link.path === "/pending-requests" &&
                        user?.pending_requests.length > 0 ? (
                            <div className="absolute top-0 right-1 badge badge-primary badge-sm">
                                {user?.pending_requests.length}
                            </div>
                        ) : null}
                    </NavLink>
                );
            })}
            {loading ? (
                <button className="btn bg-transparent border-none outline-none hover:bg-gray-700 w-20">
                    <Spinner />
                </button>
            ) : (
                <button
                    onClick={logout}
                    className="btn bg-transparent border-none outline-none hover:bg-gray-700 w-20"
                >
                    <img
                        src="/logout.png"
                        alt="logout button"
                        className="w-5"
                    />
                </button>
            )}
            {error && <ErrorToast error={error} />}
        </div>
    );

    async function logout() {
        setLoading(true);
        try {
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
}
