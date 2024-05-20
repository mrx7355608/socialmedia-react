import useFetch from "../hooks/useFetch";
import { Spinner } from "../components/spinners";
import { ErrorMessage } from "../components/error";
import { FriendsList } from "../components/friends";

export default function FriendsContainer() {
    const { loading, error, resp } = useFetch("/api/v1/friends");

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage errorMessage={error} />;
    return <FriendsList resp={resp} />;
}
