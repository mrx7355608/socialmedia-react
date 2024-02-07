import React from "react";
import FriendList from "./FriendList";
import PendingRequestsList from "./PendingRequests";

export default function FriendBar() {
    return (
        <div
            className="hidden fixed right-0 bottom-0 overflow-y-scroll lg:flex flex-col w-1/4"
            style={{ top: "60px" }}
        >
            <FriendList />
            <PendingRequestsList />
        </div>
    );
}
