import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/user";
import { useState } from "react";

export default function Navbar() {
    const { user } = useUserContext();
    const [query, setQuery] = useState("");
    const navigateTo = useNavigate();

    return (
        <nav
            style={{ background: "#1D232A" }}
            className="navbar px-4 lg:px-7 shadow-md z-10 sticky top-0"
        >
            <div className="flex-1">
                <img src="/logo.png" alt="logo" className="fit-cover w-10" />
                <Link
                    to="/"
                    className="hidden sm:inline text-lg sm:text-xl ml-1 font-semibold"
                >
                    Frost
                </Link>
            </div>
            <div className="ml-auto flex-none gap-5">
                <div className="form-control relative">
                    <form onSubmit={onSubmitHandler}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input-sm lg:input-md input input-bordered bg-gray-700 text-gray-200 w-auto"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn btn-ghost absolute top-0 right-0 btn-sm lg:btn-md"
                        >
                            <img src="/search.png" className="w-3 h-3" />
                        </button>
                    </form>
                </div>
                <div className="rounded-full avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="user-profile-picture"
                            src={user && user.profilePicture}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );

    function onSubmitHandler(e) {
        e.preventDefault();
        if (query.trim()) {
            navigateTo(`/search?name=${query}`);
        }
    }
}
