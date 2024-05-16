import { arrayProp } from "../../utils/propTypes";
import SearchItem from "./SearchItem";

export default function SearchList({ searchResults }) {
    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full max-w-lg">
            {searchResults.map((user) => {
                return <SearchItem searchedUser={user} key={user._id} />;
            })}
        </div>
    );
}

SearchList.propTypes = {
    searchResults: arrayProp,
};
