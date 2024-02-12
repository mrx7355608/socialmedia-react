import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../../components/Spinner";

// eslint-disable-next-line
export default function AddFriends({ changePage }) {
    const { loading, resp } = useAuthFetch(
        "http://localhost:8000/user/random-users"
    );

    return (
        <div className="mx-auto flex items-center justify-center w-1/2 shadow-xl bg-gray-800 h-max p-6 rounded-lg">
            <div className="w-full">
                <h1 className="text-3xl text-gray-200 font-bold mb-4 text-center mt-3">
                    Add friends
                </h1>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        className="input input-bordered flex-1 bg-gray-800"
                        name="search_friends"
                        placeholder="Search..."
                    />
                    <button className="btn btn-success btn-md">Search</button>
                </div>
                <div className="w-full h-64 overflow-y-auto p-3 mt-4">
                    {loading && <Spinner />}
                    {resp &&
                        resp.map((user) => {
                            return <AddUserCard user={user} key={user._id} />;
                        })}
                </div>
                <div className="flex justify-between w-full mt-3">
                    <button
                        onClick={changePage}
                        className="btn bg-transparent border-0 outline-0 hover:bg-gray-900"
                    >
                        Skip
                    </button>
                    <button
                        onClick={changePage}
                        className="btn btn-outline btn-accent"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

function AddUserCard({ user }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg mb-1 hover:bg-gray-700">
            <div>
                <img
                    src={user.profilePicture}
                    alt="user picture"
                    className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover inline mr-3"
                />
                <span className="font-medium text-gray-300">
                    {user.firstname}{" "}
                </span>
                <span className="font-medium text-gray-300">
                    {user.lastname}
                </span>
            </div>
            <button className="btn btn-sm btn-accent">Add friend</button>
        </div>
    );
}
