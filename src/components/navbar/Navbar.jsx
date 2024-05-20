import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [query, setQuery] = useState("");
    const navigateTo = useNavigate();

    return (
        <nav
            style={{ background: "#1D232A" }}
            className="flex items-center w-full py-2 justify-start px-4 lg:px-7 shadow-md z-10 sticky top-0"
        >
            <Link to="/">
                <img src="/logo.png" alt="logo" className="fit-cover w-10" />
            </Link>
            <div className="form-control relative w-96 ml-4">
                <form onSubmit={onSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input bg-myGray text-gray-200 w-full max-w-xs font-roboto font-medium rounded-full input-sm lg:input-md"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-ghost rounded-full absolute top-0 right-16 btn-sm lg:btn-md"
                    >
                        <img src="/search.png" className="w-4 h-4" />
                    </button>
                </form>
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
