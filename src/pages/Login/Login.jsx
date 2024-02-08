import { useState } from "react";
import SocialLoginButtons from "../../components/SocialLoginButtons";
import { Link } from "react-router-dom";

export default function Login() {
    // eslint-disable-next-line
    const [error, setError] = useState("");

    return (
        <div className="flex flex-col lg:flex-row w-3/4 gap-0 items-center justify-center py-8">
            <form method="post" className="flex-1 p-0 mt-5">
                <h1 className="text-3xl font-bold text-gray-200 mb-12">
                    Login to your account
                </h1>
                {error && (
                    <p className="text-red-900 font-medium p-3 bg-red-200 rounded-lg w-full mb-6">
                        {error}
                    </p>
                )}
                <input
                    type="email"
                    className="input input-bordered w-full bg-transparent border-2 mb-4"
                    name="email"
                    placeholder="Email address"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full bg-transparent border-2 mb-1"
                    name="password"
                />
                <p className="text-right text-sm mb-5 hover:underline hover:cursor-pointer">
                    Forgot Password?
                </p>
                <button className="btn btn-primary w-full font-medium rounded-full">
                    Login
                </button>
                <p className="text-gray-400 w-full text-center mt-4">
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
}
