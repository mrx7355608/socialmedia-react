import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/spinners/Spinner";
import SearchList from "../components/search/SearchList";

export default function Search() {
    // eslint-disable-next-line
    const [searchParams, _setSearchParams] = useSearchParams();

    const query = searchParams.get("name");
    const url = `/api/v1/user/search?name=${query}`;

    const { loading, error, resp } = useFetch(url, [query]);

    return (
        <div className="flex flex-col items-center justify-start w-full p-4 lg:w-1/2 mx-auto">
            <h1 className="font-bold text-gray-200 text-left text-3xl p-2 mb-8 mt-6">
                Showing results for {searchParams.get("name")}
            </h1>
            {loading && (
                <div className="flex items-center justify-center mx-auto w-1/2 min-h-screen">
                    <Spinner />
                </div>
            )}
            {error && <p className="text-red-400 text-lg">{error}</p>}
            {resp && <SearchList searchResults={resp} />}
        </div>
    );
}
