import { arrayPropOptional } from "../../utils/propTypes";
import UserPictureAndName from "../UserProfilePictureAndName";

export default function List({ content }) {
    return (
        <>
            {content &&
                content.map((c, idx) => {
                    return <UserPictureAndName user={c} key={idx} />;
                })}
        </>
    );
}

List.propTypes = {
    content: arrayPropOptional,
};
