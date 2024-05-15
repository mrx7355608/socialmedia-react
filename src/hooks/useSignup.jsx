import { useState } from "react";

export default function useSignup() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const signup = async (signupData) => {
        try {
            setLoading(true);
            const apiResult = await signup(signupData);

            if (apiResult.ok === false) {
                setApiError(apiResult.error);
                setTimeout(() => setApiError(""), 4000);
                return null;
            }
            return apiResult.data;
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
            setLoading(false);
        }
    };

    return { loading, apiError, signup };
}
