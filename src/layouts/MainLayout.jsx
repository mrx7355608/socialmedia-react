import MobileMenu from "../components/Navbar/MobileMenu";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/user";

export default function MainLayout() {
    const { user } = useUserContext();

    return (
        <>
            {!user ? (
                <Navigate to="/auth/login" />
            ) : (
                <>
                    <Navbar />
                    <MobileMenu />
                    <Sidebar />
                    <Outlet />
                </>
            )}
        </>
    );
}
