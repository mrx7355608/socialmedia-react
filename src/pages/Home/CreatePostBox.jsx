import { useUserContext } from "../../contexts/user";

export default function CreatePostBox() {
    const { user } = useUserContext();

    return (
        <div className="flex items-center w-full p-4 bg-gray-800 rounded-lg mb-4">
            <img
                src={user.profilePicture}
                alt="user picture"
                className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <span className="bg-gray-700 py-2 px-3 rounded-full w-full">
                Share your thoughts
            </span>
        </div>
    );
}
