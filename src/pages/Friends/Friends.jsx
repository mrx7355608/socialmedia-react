import { useState, useEffect } from "react";
import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../../components/Spinner";
import FriendDisplayCard from "./FriendDisplayCard";

export default function Friends() {
    const [myFriends, setMyFriends] = useState([]);
    const { loading, error, resp } = useAuthFetch("/api/v1/friends");

    useEffect(() => {
        if (resp) {
            setMyFriends(resp);
        }
    }, [resp]);

    if (loading) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <p className="text-red-400 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-3 w-full flex flex-col items-center justify-start lg:w-1/3 mx-auto">
            <h1 className="text-2xl font-bold text-gray-200 text-left lg:text-3xl p-4 my-4 mb-7">
                Friends
            </h1>
            {myFriends.map((frnd) => {
                return (
                    <FriendDisplayCard
                        friend={frnd}
                        key={frnd._id}
                        updateFriendsStateValue={updateFriendsStateValue}
                    />
                );
            })}
        </div>
    );

    function updateFriendsStateValue(newState) {
        console.log("asdfasdf");
        setMyFriends(newState);
    }
}
