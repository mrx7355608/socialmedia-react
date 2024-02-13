import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/user";
import { useState } from "react";

export default function Navbar() {
    const { user } = useUserContext();
    const [query, setQuery] = useState("");
    const navigateTo = useNavigate();

    return (
        <div className="navbar bg-gray-800 text-gray-200 px-7 shadow-md z-10 sticky top-0">
            <div className="flex-1">
                <img src="/logo.png" alt="logo" className="fit-cover w-8" />
                <Link to="/" className="text-xl ml-1 font-semibold">
                    Social Media
                </Link>
            </div>
            <div className="flex-none gap-5">
                <div className="hidden sm:form-control relative">
                    <form onSubmit={onSubmitHandler}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered bg-gray-700 text-gray-200 w-auto "
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn btn-ghost absolute top-0 right-0"
                        >
                            <img src="/search.png" className="w-4 h-4" />
                        </button>
                    </form>
                </div>
                <div tabIndex={0} className="rounded-full avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="user-profile-picture"
                            src={user && user.profilePicture}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    function onSubmitHandler(e) {
        e.preventDefault();
        navigateTo(`/search?name=${query}`);
    }
}
