import useFetch from "../hooks/useFetch";
import { stringProp } from "../utils/propTypes";
import { Spinner } from "../components/spinners";
import { ErrorMessage } from "../components/error";
import { UsersList } from "../components/user";

export default function UsersContainer({ endpoint }) {
    // Fetch users
    const { loading, error, resp } = useFetch(endpoint);

    // Render UI
    return (
        <>
            {loading && <Spinner />}
            {error && <ErrorMessage errorMessage={error} />}
            {resp ? (
                resp.length > 0 ? (
                    <UsersList users={resp} />
                ) : (
                    <i className="text-gray-400">Nothing to show</i>
                )
            ) : null}
        </>
    );
}

UsersContainer.propTypes = {
    endpoint: stringProp,
};
