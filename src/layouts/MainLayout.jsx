import { useEffect, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import { Navbar, MobileMenu } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import FullPageSpinner from "../components/spinners/FullPageSpinner";

export default function MainLayout() {
    const { user } = useUserContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user) {
            navigateTo("/auth/login");
        }
    }, [user, navigateTo]);

    return (
        <Suspense fallback={<FullPageSpinner />}>
            <Navbar />
            <MobileMenu />
            <Sidebar />
            <div className="mt-12 lg:mt-0 pt-1">
                <Outlet />
            </div>
        </Suspense>
    );
}
