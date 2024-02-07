import React from "react";
import FriendList from "./FriendList";
import PendingRequestsList from "./PendingRequests";

export default function FriendBar() {
    return (
        <div className="flex flex-col w-1/4">
            <FriendList />
            <PendingRequestsList />
        </div>
    );
}
