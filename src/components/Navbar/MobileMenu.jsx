import { Link } from "react-router-dom";

export default function MobileMenu() {
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
            path: "/profile",
            iconURL: "/profile.png",
        },
        {
            path: "/search",
            iconURL: "/search.png",
        },
        {
            path: "/settings",
            iconURL: "/settings.png",
        },
    ];
    return (
        <div className="flex w-full gap-2 p-1 bg-gray-800 border-gray-700 border-t sticky lg:hidden">
            {links.map((link, index) => {
                return (
                    <Link to={link.path} key={index} className="flex-1">
                        <button className="btn bg-transparent border-none w-full outline-none hover:bg-gray-700">
                            <img
                                src={link.iconURL}
                                alt="link"
                                className="w-5"
                            />
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}
