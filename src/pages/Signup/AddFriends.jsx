// eslint-disable-next-line
export default function AddFriends({ changePage }) {
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
                <div className="w-full h-64 overflow-y-auto"></div>
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
