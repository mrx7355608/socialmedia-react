import { useEffect, useState } from "react";
import FriendItem from "./FriendItem";
import { arrayProp } from "../../utils/propTypes";

export default function FriendsList({ resp }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (resp) {
            setFriends(resp);
        }
    }, [resp]);

    const removeFriendFromList = (friendID) => {
        const newList = friends.filter((f) => f._id !== friendID);
        setFriends(newList);
    };

    return (
        <div className="flex flex-col bg-myGray w-full p-5 gap-5 rounded-lg">
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <FriendItem
                        friend={friend}
                        key={friend._id}
                        filterFriendList={removeFriendFromList}
                    />
                ))
            ) : (
                <i className="text-gray-400">No friends to show</i>
            )}
        </div>
    );
}
FriendsList.propTypes = {
    resp: arrayProp,
};
