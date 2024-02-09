import { useState } from "react";
import UpdateProfilePicture from "./UpdateProfilePicture";
import AddFriends from "./AddFriends";
import UpdateBio from "./UpdateBio";
import Form from "./Form";

export default function Signup() {
    const [signedUpUser, setSignedUpUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const elems = [
        <Form
            key={0}
            changePage={changePage}
            setSignedUpUser={setSignedUpUser}
        />,
        <UpdateProfilePicture
            key={1}
            changePage={changePage}
            signedUpUser={signedUpUser}
        />,
        <AddFriends key={2} changePage={changePage} />,
        <UpdateBio key={3} changePage={changePage} />,
    ];
    return <div className="w-full">{elems[currentPage]}</div>;

    function changePage() {
        setCurrentPage(currentPage + 1);
    }
}
