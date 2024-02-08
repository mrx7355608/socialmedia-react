import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login/Login";
import UserProvider, { useUserContext } from "./contexts/user";
import useAuthFetch from "./hooks/useAuthFetch";
import { useEffect } from "react";
import Loading from "./components/Loading";

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
        ],
    },
]);

function App() {
    const { loading, user } = useAuthFetch("http://localhost:8000/user");
    const { setUser } = useUserContext();

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;
