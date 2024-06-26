import { stringProp } from "../../utils/propTypes";

export default function UserItem({ user }) {
    return (
        <div className="p-2 rounded-lg w-full">
            <img
                src={user?.profilePicture}
                alt=""
                className="w-8 h-8 fit-cover inline mr-3 rounded-full object-cover"
            />
            <span className="text-gray-300 font-medium">{user?.fullname}</span>
        </div>
    );
}

UserItem.propTypes = {
    user: {
        _id: stringProp,
        fullname: stringProp,
        profilePicture: stringProp,
    },
};
