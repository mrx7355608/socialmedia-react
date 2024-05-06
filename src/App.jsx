import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { useUserContext } from "./contexts/user";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Search = lazy(() => import("./pages/Search/Search"));
const Friends = lazy(() => import("./pages/Friends/Friends"));
const PendingRequests = lazy(
    () => import("./pages/Pending_Requests/PendingRequests"),
);
const FullPageSpinner = lazy(() => import("./components/FullPageSpinner"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "pending-requests",
                element: <PendingRequests />,
            },
            {
                path: "friends",
                element: <Friends />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ],
    },
]);

function App() {
    const { setUser } = useUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/user`, {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.ok) {
                    setUser(data.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <FullPageSpinner />;
    }

    return <RouterProvider router={router} />;
}

export default App;
