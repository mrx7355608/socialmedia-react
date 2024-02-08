import MobileMenu from "../components/Navbar/MobileMenu";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import { useEffect } from "react";

export default function MainLayout() {
    const { user } = useUserContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user) {
            navigateTo("/auth/login");
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <MobileMenu />
            <Sidebar />
            <Outlet />
        </>
    );
}
