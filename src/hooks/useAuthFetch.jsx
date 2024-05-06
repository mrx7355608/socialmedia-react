import { useEffect, useState } from "react";

export default function useAuthFetch(url, dependencyArr = []) {
    const [error, setError] = useState("");
    const [resp, setResp] = useState(null);
    const [loading, setLoading] = useState(true);

    // Remove the first / from the url because it's already
    // included in the SERVER_URL
    url = url.split("/");
    url.shift();
    url = url.join("/");
    url = `${import.meta.env.VITE_SERVER_URL}${url}`;

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
