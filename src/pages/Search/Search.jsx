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

    return (
        <div className="flex flex-col items-center justify-start w-1/2 mx-auto">
            <h1 className="font-bold text-gray-200 text-left text-2xl p-4">
                Showing results for {searchParams.get("name")}
            </h1>
            {resp.map((friend) => {
                return <AddFriendCard user={friend} key={friend._id} />;
            })}
        </div>
    );
}
