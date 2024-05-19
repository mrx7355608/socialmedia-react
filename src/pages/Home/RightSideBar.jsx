import { Link } from "react-router-dom";
import { stringProp } from "../../utils/propTypes";
import UsersContainer from "../../containers/UsersContainer";

export default function RightSideBar() {
    return (
        <div
            className="hidden fixed right-0 bottom-0 overflow-y-scroll lg:flex flex-col w-1/4"
            style={{ top: "60px" }}
        >
            {/* Friends list section */}
            <div className="hidden w-full p-3 lg:flex flex-col gap-3 mb-6">
                <h1 className="text-gray-200 text-lg font-bold">Friends</h1>
                <hr />
                <UsersContainer endpoint="/api/v1/friends" />
            </div>

            {/* Pending requests section */}
            <div className="hidden w-full p-3 lg:flex flex-col gap-3 mb-6">
                <h1 className="text-gray-200 text-md lg:text-lg font-bold">
                    Pending Requests
                </h1>
                <hr />
                <UsersContainer endpoint="/api/v1/friends/pending-requests" />
            </div>
        </div>
    );
}

function ViewMoreButton({ pageURL }) {
    return (
        <Link className="btn-sm btn-ghost w-full" to={pageURL}>
            View more
        </Link>
    );
}

ViewMoreButton.propTypes = {
    pageURL: stringProp,
};
