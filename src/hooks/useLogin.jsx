import { useState } from "react";
import { AuthServices } from "../api/auth";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const authServices = AuthServices();

    async function loginUser(loginData) {
        try {
            setLoading(true);
            const response = await authServices.login(loginData);
            if (response.ok) {
                return response.data;
            }
            setApiError(response.error);
            return false;
        } catch (err) {
            setApiError("An un-expected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { loading, apiError, loginUser };
}
