import { useState } from "react";
import UpdateProfilePicture from "./UpdateProfilePicture";
import AddFriends from "./AddFriends";
import UpdateBio from "./UpdateBio";

export default function CompleteSignup() {
    const [currentPage, setCurrentPage] = useState(0);
    const changePage = () => {
        setCurrentPage(currentPage + 1);
    };
    const elems = [
        <UpdateProfilePicture key={0} changePage={changePage} />,
        <AddFriends key={1} changePage={changePage} />,
        <UpdateBio key={2} changePage={changePage} />,
    ];

    return (
        <div className="flex items-center justify-center h-screen w-1/2 shadow-xl bg-gray-800 h-max p-6 rounded-lg">
            {elems[currentPage]}
        </div>
    );
}
