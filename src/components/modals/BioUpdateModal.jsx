import { useState } from "react";
import UserServices from "../../api/user";
import Spinner from "../spinners/Spinner";
import { useUserContext } from "../../contexts/user";

export default function BioUpdateModal() {
    const userServices = UserServices();
    const { user, setUser } = useUserContext();

    const [bio, setBio] = useState(user?.bio || "");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    const updateBio = async () => {
        if (!bio) {
            setApiError("Nothing to update");
            setTimeout(() => setApiError(""), 4000);
            return;
        }
        try {
            setLoading(true);
            const response = await userServices.update({ bio });
            setUser({ ...user, bio: response.data.bio });
            closeModal();
        } catch (err) {
            setApiError("An un-expected error occured");
            setTimeout(() => setApiError(""), 4000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button className="btn btn-xs btn-outline" onClick={openModal}>
                Edit
            </button>
            <dialog id="my_modal_9" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h1 className="text-3xl text-gray-200 font-bold mb-4 text-center mt-3">
                        Update Bio
                    </h1>
                    <textarea
                        className="textarea textarea-primary resize-none bg-transparent w-full mb-1"
                        placeholder="Let people know about you."
                        rows={4}
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    ></textarea>
                    {apiError && (
                        <p className="text-red-500 mb-5">{apiError}</p>
                    )}
                    <button className="btn btn-primary" onClick={updateBio}>
                        {loading ? <Spinner /> : "Update"}
                    </button>
                    <button className="btn ml-4" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </dialog>
        </>
    );

    function openModal() {
        document.getElementById("my_modal_9").showModal();
    }

    function closeModal() {
        document.getElementById("my_modal_9").close();
    }
}
