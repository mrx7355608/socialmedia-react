import { useState } from "react";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line
export default function UpdateBio() {
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();

    const updateBio = async () => {
        setLoading(true);
        const resp = await fetch("http://localhost:8000/user", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bio }),
        });
        const result = await resp.json();
        setLoading(false);
        if (result.ok) {
            navigateTo("/");
        }
    };

    return (
        <div className="mx-auto flex items-center justify-center w-1/2 shadow-xl bg-gray-800 h-max p-6 rounded-lg">
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