import SocialLoginButtons from "../../components/SocialLoginButtons";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";
import Spinner from "../../components/spinners/Spinner";
import { useState } from "react";
import { useUserContext } from "../../contexts/user";

export default function Login() {
    const { loading, apiError, loginUser } = useLogin();
    const { setUser } = useUserContext();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    return (
        <div className="w-full p-6 flex flex-col lg:flex-row lg:w-3/4 gap-0 items-center justify-center py-8">
            <form
                method="post"
                className="flex-1 p-0 mt-5"
                onSubmit={onSubmitHandler}
            >
                <h1 className="text-2xl lg:text-3xl font-bold mb-12">
                    Login to your account
                </h1>
                {apiError && (
                    <p className="text-red-100 font-medium p-3 bg-red-900 rounded-lg w-full mb-6">
                        {apiError}
                    </p>
                )}
                <input
                    onChange={onChangeHandler}
                    type="email"
                    className="input input-bordered w-full mb-4"
                    name="email"
                    placeholder="Email address"
                />
                <input
                    onChange={onChangeHandler}
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-1"
                    name="password"
                />
                <p className="text-sm lg:text-md text-right text-sm mb-5 hover:underline hover:cursor-pointer">
                    Forgot Password?
                </p>
                <button className="btn btn-primary w-full font-medium rounded-full">
                    {loading ? <Spinner /> : "Login"}
                </button>
                <p className="text-sm lg:text-md text-gray-400 w-full text-center mt-4">
                    Don&#39;t have an account?{" "}
                    <Link
                        to="/auth/signup"
                        className="font-medium text-primary"
                    >
                        Signup
                    </Link>
                </p>
            </form>
            <hr className="w-full my-8 lg:w-48 lg:rotate-90 border-gray-800 max-w-md" />
            <SocialLoginButtons />
        </div>
    );

    async function onChangeHandler(e) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    async function onSubmitHandler(e) {
        e.preventDefault();
        const user = await loginUser(loginData);
        if (user) {
            setUser(user);
        }
    }
}
