import { useState } from "react";

export default function useSignup() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const signup = (signupData) => {
        setLoading(true);
        fetch("http://localhost:8000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (!data.ok) {
                    setApiError(data.error);
                }
            })
            .catch(() => setApiError("An un-expected error occured"))
            .finally(() => setLoading(false));
    };

    return { loading, apiError, signup };
}
