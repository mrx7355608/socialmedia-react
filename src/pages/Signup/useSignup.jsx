import { useState } from "react";

export default function useSignup() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const signup = async (signupData) => {
        setLoading(true);
        const url = "http://localhost:8000/auth/signup";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
            credentials: "include",
        };
        try {
            // Make request to server
            const resp = await fetch(url, options);
            const apiResult = await resp.json();
            setLoading(false);
            if (apiResult.ok === false) {
                setApiError(apiResult.error);
                setTimeout(() => setApiError(""), 4000);
                return null;
            }
            // return data of newly created user
            return apiResult.data;
        } catch (err) {
            setApiError("An un-expected error occured");
            setLoading(false);
        }
    };

    return { loading, apiError, signup };
}
