import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login/Login";
import { useState, useEffect } from "react";
import { useUserContext } from "./contexts/user";
import FullPageSpinner from "./components/FullPageSpinner";
import Signup from "./pages/Signup/Signup";
import CompleteSignup from "./pages/Signup/CompleteSignup";

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
            {
                path: "complete-signup",
                element: <CompleteSignup />,
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
