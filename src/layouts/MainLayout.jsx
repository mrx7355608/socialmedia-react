import React from "react";
import MobileMenu from "../components/Navbar/MobileMenu";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import { useEffect } from "react";
import FullPageSpinner from "../components/FullPageSpinner";

export default function MainLayout() {
    const { user } = useUserContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user) {
            navigateTo("/auth/login");
        }
    }, [user]);

    return (
        <React.Suspense fallback={<FullPageSpinner />}>
            <Navbar />
            <MobileMenu />
            <Sidebar />
            <div className="mt-0 pt-1">
                <Outlet />
            </div>
        </React.Suspense>
    );
}
