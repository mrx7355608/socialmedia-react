import { useState } from "react";

export default function useAddFriend() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    async function sendFriendRequest(userID) {
        setLoading(true);
        const url = `http://localhost:8000/friend/send-request/${userID}`;
        const options = {
            method: "POST",
            credentials: "include",
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);
            if (result.ok) {
                return true;
            }
            return false;
        } catch (err) {
            setApiError("An un-expected error occurred");
            setLoading(false);
        }
    }

    return { loading, apiError, sendFriendRequest };
}
