import { stringProp } from "../utils/propTypes";

export default function UserPictureAndName({ user }) {
    return (
        <div className="p-3 rounded-lg w-full">
            <img
                src={user?.profilePicture}
                alt=""
                className="w-8 h-8 fit-cover inline mr-3 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-gray-300 font-medium">{user?.fullname}</span>
        </div>
    );
}

UserPictureAndName.propTypes = {
    user: {
        profilePicture: stringProp,
        fullname: stringProp,
    },
};
