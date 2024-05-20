import { useState, useRef } from "react";
import { useUserContext } from "../../contexts/user";
import UserServices from "../../api/user";
import CloudinaryServices from "../../api/cloudinary";
import { Spinner } from "../spinners";

export default function PictureUpdateModal() {
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [profilePicturePreview, setPreview] = useState(
        user?.profilePicture || ""
    );

    const profileRef = useRef();
    const userServices = UserServices();
    const cloudinaryServices = CloudinaryServices();

    return (
        <>
            <button className="btn btn-xs btn-outline ml-8" onClick={openModal}>
                Edit
            </button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h1 className="text-3xl text-gray-200 font-bold mb-10 mt-4">
                        Change Profile picture
                    </h1>

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
                        className="file-input file-input-bordered w-full max-w-xs mt-8"
                        onChange={onChangeHandler}
                    />
                    {apiError && (
                        <p className="text-red-500 mt-2">{apiError}</p>
                    )}
                    <div className="mt-4">
                        <button
                            onClick={changeProfilePicture}
                            className="btn btn-primary"
                        >
                            {loading ? <Spinner /> : "Continue"}
                        </button>
                        <button className="btn ml-4" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );

    function openModal() {
        document.getElementById("my_modal_4").showModal();
    }

    function closeModal() {
        document.getElementById("my_modal_4").close();
    }

    function onChangeHandler(e) {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    async function changeProfilePicture() {
        try {
            const pictureFile = profileRef.current.files[0];
            if (!pictureFile) {
                setApiError("No image selected");
                setTimeout(() => setApiError(""), 4000);
                return;
            }

            setLoading(true);
            const result = await cloudinaryServices.upload(pictureFile);
            const apiResult = await userServices.update({
                profilePicture: result.secure_url,
            });

            if (apiResult.ok === false) {
                return setApiError(apiResult.error);
            }
            setUser({ ...user, profilePicture: apiResult.data.profilePicture });
            closeModal();
        } catch (err) {
            setApiError("An un-expected error occured");
            setTimeout(() => setApiError(""), 4000);
        } finally {
            setLoading(false);
        }
    }
}
