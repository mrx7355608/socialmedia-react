import { useState, useEffect } from "react";
import useAuthFetch from "../../hooks/useAuthFetch";
import Spinner from "../../components/Spinner";
import FriendDisplayCard from "./FriendDisplayCard";

export default function Friends() {
    const [myFriends, setMyFriends] = useState([]);
    const { loading, error, resp } = useAuthFetch(
        "http://localhost:8000/friends"
    );

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
        <div className="flex flex-col items-center justify-start w-1/3 mx-auto">
            <h1 className="font-bold text-gray-200 text-left text-3xl p-4 my-4 mb-7">
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
