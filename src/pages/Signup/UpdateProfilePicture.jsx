import { useRef } from "react";

// eslint-disable-next-line
export default function UpdateProfilePicture({ changePage }) {
    const profileRef = useRef();
    const selectProfilePicture = () => {
        profileRef.current.click();
    };

    return (
        <div className="mx-auto flex items-center justify-center w-1/2 shadow-xl bg-gray-800 h-max p-6 rounded-lg">
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="text-3xl text-gray-200 font-bold mb-10 mt-4">
                    Change Profile picture
                </h1>
                <input
                    ref={profileRef}
                    type="file"
                    name="profilePicture"
                    className="hidden"
                />
                <img
                    src="/logo.png"
                    alt="user profile picture"
                    className="w-28 rounded-full border-4 border-gray-400"
                />
                <div className="flex gap-4 items-center justify-center">
                    <button
                        onClick={selectProfilePicture}
                        className="btn btn-outline btn-warning w-full mb-8 mt-7 max-w-xs"
                    >
                        Select
                    </button>
                    <button className="btn btn-warning w-full mb-8 mt-7 max-w-xs">
                        Update
                    </button>
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
