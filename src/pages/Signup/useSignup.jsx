import { useState } from "react";

export default function useSignup() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const signup = async (signupData, changePage, setNewUser) => {
        try {
            setLoading(true);
            const resp = await fetch("http://localhost:8000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
                credentials: "include",
            });
            const apiResult = await resp.json();
            setLoading(false);
            if (!apiResult.ok) {
                setApiError(apiResult.error);
            } else {
                setNewUser(apiResult.data);
                changePage();
            }
        } catch (err) {
            setApiError(err.message);
            setLoading(false);
        }
    };

    return { loading, apiError, signup };
}
