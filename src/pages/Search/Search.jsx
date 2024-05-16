import useAuthFetch from "../../hooks/useAuthFetch";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/spinners/Spinner";
import SearchList from "../../components/search/SearchList";

export default function Search() {
    // eslint-disable-next-line
    const [searchParams, _setSearchParams] = useSearchParams();

    const query = searchParams.get("name");
    const url = `/api/v1/user/search?name=${query}`;

    const { loading, error, resp } = useAuthFetch(url, [query]);

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
            <SearchList searchResults={resp} />
        </div>
    );
}
