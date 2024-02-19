import useAuthFetch from "../../hooks/useAuthFetch";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import AddFriendCard from "./AddFriendCard";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, error, resp } = useAuthFetch(
        `http://localhost:8000/user/search?name=${searchParams.get("name")}`,
        [searchParams.get("name")]
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                <p className="text-red-400 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start w-full p-4 lg:w-1/2 mx-auto">
            <h1 className="font-bold text-gray-200 text-left text-2xl p-2 mb-8 mt-6">
                Showing results for {searchParams.get("name")}
            </h1>
            {resp.map((friend) => {
                return <AddFriendCard friend={friend} key={friend._id} />;
            })}
        </div>
    );
}
