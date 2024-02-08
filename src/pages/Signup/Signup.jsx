import { useState } from "react";
import SocialLoginButtons from "../../components/SocialLoginButtons";
import useSignup from "./useSignup";
import Spinner from "../../components/Spinner";

export default function Signup() {
    const { loading, apiError } = useSignup();
    const [signupData, setSignupData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(signupData);
        // signup(signupData);
    };

    return (
        <div className="flex flex-col lg:flex-row w-3/4 gap-0 items-center justify-center py-8">
            <form
                method="post"
                className="flex-1 p-0 mt-5"
                onSubmit={onSubmitHandler}
            >
                <h1 className="text-3xl font-bold text-gray-200 mb-12">
                    Create your account
                </h1>
                {apiError && (
                    <p className="text-red-900 font-medium p-3 bg-red-200 rounded-lg w-full mb-6">
                        {apiError}
                    </p>
                )}
                <input
                    type="text"
                    className="input input-bordered w-full bg-transparent border-2 mb-4"
                    name="firstname"
                    placeholder="First name"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    className="input input-bordered w-full bg-transparent border-2 mb-4"
                    name="lastname"
                    placeholder="Last name"
                    onChange={onChangeHandler}
                />
                <input
                    type="email"
                    className="input input-bordered w-full bg-transparent border-2 mb-4"
                    name="email"
                    placeholder="Email address"
                    onChange={onChangeHandler}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full bg-transparent border-2 mb-4"
                    name="password"
                    onChange={onChangeHandler}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full bg-transparent border-2"
                    name="confirm_password"
                    onChange={onChangeHandler}
                />
                <button
                    type="submit"
                    className="btn btn-primary w-full font-medium rounded-full mt-8"
                >
                    {loading ? <Spinner /> : "Signup"}
                </button>
            </form>
            <hr className="w-full my-8 lg:w-48 lg:rotate-90 border-gray-800 max-w-md" />
            <SocialLoginButtons />
        </div>
    );
}
