import { useState, useEffect } from "react";
import { arrayProp } from "../../utils/propTypes";
import { useUserContext } from "../../contexts/user";
import PendingRequestItem from "./PendingRequestItem";

export default function PendingRequestsList({ resp }) {
    const { user, setUser } = useUserContext();
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        if (resp) {
            setPendingRequests(resp);
        }
    }, [resp]);

    return (
        <>
            {pendingRequests.length < 1 ? (
                <i className="text-gray-600 text-lg font-medium">
                    No pending requests to show
                </i>
            ) : (
                pendingRequests.map((req) => {
                    return (
                        <PendingRequestItem
                            request={req}
                            key={req._id}
                            removeRequestFromList={removeRequestFromList}
                        />
                    );
                })
            )}
        </>
    );

    function removeRequestFromList(requestID) {
        const newList = pendingRequests.filter((p) => p._id !== requestID);
        setPendingRequests(newList);
        setUser({ ...user, pending_requests: newList });
    }
}
PendingRequestsList.propTypes = {
    resp: arrayProp,
};
