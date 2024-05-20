import { useState } from "react";
import {
    SignupForm,
    UpdateBio,
    UpdateProfilePicture,
} from "../components/auth";

export default function Signup() {
    const [signedUpUser, setSignedUpUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const elems = [
        <SignupForm
            key={0}
            changePage={changePage}
            setSignedUpUser={setSignedUpUser}
        />,
        <UpdateProfilePicture
            key={1}
            changePage={changePage}
            signedUpUser={signedUpUser}
        />,
        <UpdateBio
            key={2}
            changePage={changePage}
            signedUpUser={signedUpUser}
        />,
    ];
    return <div className="w-full">{elems[currentPage]}</div>;

    function changePage() {
        setCurrentPage(currentPage + 1);
    }
}
