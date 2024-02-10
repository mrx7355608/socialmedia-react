import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { useUserContext } from "./contexts/user";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const FullPageSpinner = lazy(() => import("./components/FullPageSpinner"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
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
        fetch("http://localhost:8000/user", {
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
