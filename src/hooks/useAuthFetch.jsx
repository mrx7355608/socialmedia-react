import { useEffect, useState } from "react";

export default function useAuthFetch(url, dependencyArr = []) {
    const [error, setError] = useState("");
    const [resp, setResp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (!data.ok) {
                    throw new Error(data.error);
                }
                setResp(data.data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, dependencyArr);

    return { error, loading, resp };
}
