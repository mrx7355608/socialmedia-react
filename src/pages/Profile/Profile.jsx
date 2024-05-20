import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/user";
import PostsContainer from "../../containers/PostsContainer";
import FriendsContaienr from "../../containers/FriendsContainer";
import BioUpdateModal from "../../components/modals/BioUpdateModal";
import PictureUpdateModal from "../../components/modals/PictureUpdateModal";

export default function Profile() {
    const { user } = useUserContext();
    const navTo = useNavigate();

    return (
        <div
            className="w-full flex flex-col items-center p-5 lg:w-3/4 lg:ml-auto lg:items-start"
            style={{ minWidth: "400px" }}
        >
            <h1 className="text-white mt-8 mb-12 text-4xl font-bold">
                Profile
            </h1>

            {/* Profile picture and Fullname */}
            <div className="flex flex-col items-center lg:flex-row p-3 rounded-lg">
                <img
                    src={user?.profilePicture}
                    alt="user profile picture"
                    className="inline w-20 h-20 fit-cover inline mr-3 rounded-full border border-gray-300 object-cover"
                />
                <div className="text-center mt-2 lg:mt-0 lg:text-left">
                    <p className="text-gray-300 font-medium text-lg">
                        {user?.fullname}
                    </p>
                    <p className="text-gray-400 text-sm font-medium">
                        Joined on{" "}
                        <i>{new Date(user.createdAt).toDateString()}</i>
                    </p>
                </div>
                <PictureUpdateModal />
            </div>
            {/* Bio */}
            <div className="lg:w-full">
                <div className="flex items-center mt-14">
                    <h1 className="text-2xl font-medium text-white mr-5">
                        Your Bio
                    </h1>
                    <BioUpdateModal />
                </div>
                {user?.bio ? (
                    <p className="text-gray-300 mt-5 bg-myGray p-4 rounded-lg">
                        {user.bio}
                    </p>
                ) : (
                    <i className="text-gray-400 text-md mt-5">
                        No bio provided
                    </i>
                )}
            </div>

            {/* Friends */}
            <div className="flex items-center mt-14 mb-5 lg:w-full">
                <h1 className="text-2xl font-medium text-white mr-5">
                    Your Friends
                </h1>
                <button
                    onClick={() => navTo("/friends")}
                    className="btn btn-xs btn-outline"
                >
                    Edit
                </button>
            </div>
            <div className="flex flex-wrap w-full gap-3 items-center">
                <FriendsContaienr />
            </div>

            {/* Posts */}
            <div className="mt-14 mb-6">
                <h1 className="text-2xl font-medium text-white mr-5">
                    Your Posts
                </h1>
            </div>
            <PostsContainer endpoint="/api/v1/posts" />
        </div>
    );
}
