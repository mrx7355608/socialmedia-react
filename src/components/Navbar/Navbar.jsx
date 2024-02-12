import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/user";

export default function Navbar() {
    const { user } = useUserContext();

    return (
        <div className="navbar bg-gray-800 text-gray-200 px-7 shadow-md z-10 sticky top-0">
            <div className="flex-1">
                <img src="/logo.png" alt="logo" className="fit-cover w-8" />
                <Link to="/" className="text-xl ml-1 font-semibold">
                    Social Media
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="hidden sm:form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered bg-gray-700 text-gray-200 w-auto"
                    />
                </div>
                <div tabIndex={0} className="rounded-full avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="user-profile-picture"
                            src={user.profilePicture}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
