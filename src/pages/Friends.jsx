import FriendsContainer from "../containers/FriendsContainer";

export default function Friends() {
    return (
        <div className="p-3 w-full flex flex-col items-center justify-start lg:w-1/3 mx-auto">
            <h1 className="text-2xl font-bold text-gray-200 text-left lg:text-3xl p-4 my-4 mb-7">
                Friends
            </h1>
            <div className="flex flex-col bg-myGray w-full p-5 gap-5 rounded-lg">
                <FriendsContainer />
            </div>
        </div>
    );
}
