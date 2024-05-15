import { useState } from "react";
import Spinner from "../../spinners/Spinner";
import { useUserContext } from "../../../contexts/user";
import UserServices from "../../../api/user";
import { useNavigate } from "react-router-dom";

const userServices = UserServices();

// eslint-disable-next-line
export default function UpdateBio({ signedUpUser }) {
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const { setUser } = useUserContext();
    const navTo = useNavigate();

    const updateBio = async () => {
        try {
            setLoading(true);
            await userServices.update({ bio });
            setUser(signedUpUser);
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
            setLoading(false);
            navTo("/");
        }
    };

    return (
        <div
            className="mx-auto flex items-center justify-center max-w-lg shadow-xl bg-myGray h-max p-6 rounded-lg"
            style={{ width: "95vw" }}
        >
            <div className="w-full">
                <h1 className="text-3xl text-gray-200 font-bold mb-4 text-center mt-3">
                    Update Bio
                </h1>
                <textarea
                    className="textarea textarea-primary resize-none bg-transparent w-full mb-3"
                    placeholder="Let people know about you."
                    rows={4}
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>
                {apiError && <p className="text-red-500">{apiError}</p>}
                <button className="btn btn-primary" onClick={updateBio}>
                    {loading ? <Spinner /> : "Complete"}
                </button>
            </div>
        </div>
    );
}
