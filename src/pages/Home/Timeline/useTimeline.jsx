import { useState, useEffect } from "react";
import { useTimelineContext } from "../../../contexts/timeline";

export default function useTimeline() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { setTimeline } = useTimelineContext();

    useEffect(() => {
        setLoading(true);
        const url = `${import.meta.env.VITE_SERVER_URL}api/v1/posts/timeline`;
        const options = {
            method: "GET",
            credentials: "include",
        };

        // Fetch timeline
        fetch(url, options)
            .then((resp) => resp.json())
            .then((result) => setTimeline(result.data))
            .catch(() => setError("dsfad"))
            .finally(() => setLoading(false));
    }, [setLoading, setTimeline]);

    return { loading, error };
}
