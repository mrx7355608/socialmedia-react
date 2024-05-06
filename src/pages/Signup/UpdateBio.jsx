import { useState } from "react";
import Spinner from "../../components/Spinner";
import { useUserContext } from "../../contexts/user";

// eslint-disable-next-line
export default function UpdateBio({ signedUpUser }) {
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    // const navigateTo = useNavigate();
    const { setUser } = useUserContext();

    const updateBio = async () => {
        setLoading(true);
        const resp = await fetch(
            `${import.meta.env.VITE_SERVER_URL}api/v1/user`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bio }),
            },
        );
        await resp.json();
        setLoading(false);
        setUser(signedUpUser);
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
                <button className="btn btn-primary" onClick={updateBio}>
                    {loading ? <Spinner /> : "Complete"}
                </button>
            </div>
        </div>
    );
}
