import UserItem from "./UserItem";

export default function UsersList({ users }) {
    return users.map((user) => {
        return <UserItem user={user} key={user._id} />;
    });
}
