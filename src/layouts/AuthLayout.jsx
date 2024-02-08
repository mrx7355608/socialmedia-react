import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/user";

export default function AuthLayout() {
    const { user } = useUserContext();
    console.log(user);
    return (
        <div className="h-screen flex items-center justify-center">
            {!user ? <Outlet /> : <Navigate to="/" />}
        </div>
    );
}
