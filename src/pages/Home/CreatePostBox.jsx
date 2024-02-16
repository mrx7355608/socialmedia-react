import { useUserContext } from "../../contexts/user";

export default function CreatePostBox() {
    const { user } = useUserContext();

    return (
        <div className="flex flex-col justify-start w-full p-4 bg-gray-800 rounded-lg mb-4">
            <div className="flex items-start w-full">
                <img
                    src={user && user.profilePicture}
                    alt="user picture"
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <textarea
                    className="textarea textarea-bordered textarea-md bg-transparent w-full resize-none"
                    placeholder="Share your thougts"
                    rows={3}
                ></textarea>
            </div>
            <button className="btn btn-success w-24 ml-auto mt-3">Post</button>
        </div>
    );
}
