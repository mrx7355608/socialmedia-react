import UserServices from "../../api/user";
import Spinner from "../spinners/Spinner";
import { funcProp, stringProp } from "../../utils/propTypes";
import { useEffect, useRef, useState } from "react";
import CloudinaryServices from "../../api/cloudinary";
import { ErrorToast } from "../../components/toasts";

export default function UpdateProfilePicture({ changePage, signedUpUser }) {
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const [profilePicturePreview, setPreview] = useState("");

    const profileRef = useRef();
    const userServices = UserServices();
    const cloudinaryServices = CloudinaryServices();

    useEffect(() => {
        if (signedUpUser.profilePicture) {
            setPreview(signedUpUser.profilePicture);
        }
    }, [signedUpUser.profilePicture]);

    return (
        <div
            className="mx-auto flex items-center justify-center lg:w-1/2 shadow-xl bg-myGray h-max p-6 rounded-lg"
            style={{ width: "95vw" }}
        >
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="text-3xl text-gray-200 font-bold mb-10 mt-4">
                    Change Profile picture
                </h1>
                {apiError && <ErrorToast error={apiError} />}

                {/* Profile picture preview */}
                <img
                    src={profilePicturePreview}
                    alt="user profile picture"
                    className="w-28 h-28 rounded-full border-4 border-gray-400 object-cover"
                />

                {/* File input for selecting profile picture */}
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
        try {
            const pictureFile = profileRef.current.files[0];
            if (!pictureFile) {
                return setApiError("No image selected");
            }

            setLoading(true);
            const result = await cloudinaryServices.upload(pictureFile);
            const apiResult = await userServices.update({
                profilePicture: result.secure_url,
            });

            if (apiResult.ok === false) {
                setApiError(apiResult.error);
            }
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
            setLoading(false);
            changePage();
        }
    }
}

UpdateProfilePicture.propTypes = {
    signedUpUser: {
        profilePicture: stringProp,
    },
    changePage: funcProp,
};
