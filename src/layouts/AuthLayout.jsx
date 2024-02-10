import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../components/FullPageSpinner";

export default function AuthLayout() {
    const { user } = useUserContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (user) {
            navigateTo("/");
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <React.Suspense fallback={<FullPageSpinner />}>
                <Outlet />
            </React.Suspense>
        </div>
    );
}
