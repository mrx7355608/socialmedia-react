import { useState } from "react";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    async function loginUser(loginData) {
        const url = `${import.meta.env.VITE_SERVER_URL}api/v1/auth/login`;
        const options = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        setLoading(true);
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result.ok) {
                return result.data;
            }
            setApiError(result.error);
            setLoading(false);
            return false;
        } catch (err) {
            setApiError("An un-expected error occurred");
            setLoading(false);
        }
    }

    return { loading, apiError, loginUser };
}
