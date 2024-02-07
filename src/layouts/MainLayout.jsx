import React from "react";
import MobileMenu from "../components/Navbar/MobileMenu";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <MobileMenu />
            <Sidebar />
            <Outlet />
        </>
    );
}
