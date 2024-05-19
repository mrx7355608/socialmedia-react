import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";

export default function FriendsSection() {
    const { loading, error, resp } = useFetch("/api/v1/friends");

    return (
        <div className="p-3 w-full flex flex-wrap items-center justify-start lg:w-1/3 mx-auto">
            {resp.map((frnd) => {
                return <FriendProfilePageCard friend={frnd} key={frnd._id} />;
            })}
        </div>
    );
}

function FriendProfilePageCard({ friend }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <img
                    src={friend.profilePicture}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full object-cover inline mr-3"
                />
                <p className="text-md font-bold lg:text-lg text-gray-300 mb-0">
                    {friend.fullname}
                </p>
            </div>
        </div>
    );
}
