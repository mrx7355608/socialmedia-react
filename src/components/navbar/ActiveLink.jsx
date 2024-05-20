import { NavLink } from "react-router-dom";
import { stringProp } from "../../utils/propTypes";
import { useUserContext } from "../../contexts/user";

export default function ActiveLink({ linkObject }) {
    const { user } = useUserContext();

    const activeClass =
        "relative btn bg-gray-700 border-none w-full flex-1 outline-none";
    const notActiveClass =
        "relative btn bg-transparent border-none w-full outline-none flex-1 hover:bg-gray-700";

    return (
        <NavLink
            to={linkObject.path}
            className={(navData) => {
                return navData.isActive ? activeClass : notActiveClass;
            }}
        >
            <img src={linkObject.icon} alt="link" className="w-5" />
            {isPendingRequestsLink() && pendingRequestsCount() > 0 ? (
                <div className="absolute top-2 right-9 py-2 badge badge-error text-white font-roboto badge-sm">
                    {user?.pending_requests.length}
                </div>
            ) : null}
        </NavLink>
    );

    function isPendingRequestsLink() {
        return linkObject.path === "/pending-requests";
    }
    function pendingRequestsCount() {
        return user?.pending_requests.length;
    }
}
ActiveLink.propTypes = {
    linkObject: {
        path: stringProp,
        icon: stringProp,
    },
};
