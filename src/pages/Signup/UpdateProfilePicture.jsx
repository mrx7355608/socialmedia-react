import { useRef, useState } from "react";
import useUpdateProfilePicture from "./useUpdateProfilePicture";
import Spinner from "../../components/Spinner";

// eslint-disable-next-line
export default function UpdateProfilePicture({ changePage, signedUpUser }) {
    const { loading, apiError, uploadProfilePicture } =
        useUpdateProfilePicture();
    const [profilePicturePreview, setPreview] = useState(
        signedUpUser.profilePicture
    );
    const profileRef = useRef();

    return (
        <div className="mx-auto flex items-center justify-center w-1/2 shadow-xl bg-gray-800 h-max p-6 rounded-lg">
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="text-3xl text-gray-200 font-bold mb-10 mt-4">
                    Change Profile picture
                </h1>
                {apiError && (
                    <p className="font-medium mb-5 w-full max-w-md p-3 rounded-lg bg-red-200 text-red-900">
                        {apiError}
                    </p>
                )}
                <img
                    src={profilePicturePreview}
                    alt="user profile picture"
                    className="w-28 h-28 rounded-full border-4 border-gray-400 object-cover"
                />
                <input
                    ref={profileRef}
                    type="file"
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs mt-8"
                    onChange={onChangeHandler}
                />
                <div className="flex justify-between w-full mt-3">
                    <button
                        onClick={changePage}
                        className="btn bg-transparent border-0 outline-0 hover:bg-gray-900"
                    >
                        Skip
                    </button>
                    <button
                        onClick={changeProfilePicture}
                        className="btn btn-outline btn-accent"
                    >
                        {loading ? <Spinner /> : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );

    function onChangeHandler(e) {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    async function changeProfilePicture() {
        const newProfilePicture = profileRef.current.files[0];
        const isUploaded = await uploadProfilePicture(newProfilePicture);
        if (isUploaded) {
            changePage();
        }
    }
}
