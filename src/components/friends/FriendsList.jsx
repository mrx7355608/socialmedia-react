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
        <>
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
        </>
    );
}
FriendsList.propTypes = {
    resp: arrayProp,
};
