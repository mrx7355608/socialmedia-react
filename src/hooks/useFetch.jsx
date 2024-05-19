import { useEffect, useState } from "react";
import { axiosAgent } from "../utils/axiosAgent";

export default function useFetch(url, dependencyArr = []) {
    const [error, setError] = useState("");
    const [resp, setResp] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axiosAgent.get(url);
            const result = response.data;
            setResp(result.data);
        } catch (err) {
            setError("An un-expected error occured");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, dependencyArr);

    return { error, loading, resp };
}
