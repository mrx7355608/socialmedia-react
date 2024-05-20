import { useState } from "react";
import Spinner from "../spinners/Spinner";
import { useUserContext } from "../../contexts/user";
import { AuthServices } from "../../api/auth";
import { ErrorToast } from "../toasts";
import ActiveLink from "./ActiveLink";

export default function MobileMenu() {
    const links = [
        {
            path: "/",
            icon: "/home.png",
        },
        {
            path: "/friends",
            icon: "/friends.png",
        },
        {
            path: "/pending-requests",
            icon: "/pending.png",
        },
    ];

    return (
        <div className="flex w-full gap-2 p-1 bg-myGray border-gray-700 border-t fixed shadow-md z-20 lg:hidden">
            {links.map((linkObject, index) => {
                return <ActiveLink linkObject={linkObject} key={index} />;
            })}
            <LogoutButton />
        </div>
    );
}

function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const authServices = AuthServices();
    const { setUser } = useUserContext();

    return (
        <>
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
        </>
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
