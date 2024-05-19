import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { useUserContext } from "./contexts/user";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ErrorPage from "./pages/ErrorPage";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Search = lazy(() => import("./pages/Search"));
const Friends = lazy(() => import("./pages/Friends"));
const PendingRequests = lazy(() => import("./pages/PendingRequests"));
const FullPageSpinner = lazy(() =>
    import("./components/spinners/FullPageSpinner")
);
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
    {
        path: "*",
        element: <NotFound />,
    },
]);

function App() {
    const { setUser } = useUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user`, {
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
