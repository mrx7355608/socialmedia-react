import { useState } from "react";
import SocialLoginButtons from "../../SocialLoginButtons";
import Spinner from "../../spinners/Spinner";
import { Link } from "react-router-dom";
import { AuthServices } from "../../../api/auth";

// eslint-disable-next-line
export default function SignupForm({ changePage, setSignedUpUser }) {
    const authServices = AuthServices();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [signupData, setSignupData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    return (
        <div className="flex flex-col lg:flex-row w-full p-4 lg:w-3/4 gap-0 items-center justify-center mx-auto">
            <form
                method="post"
                className="flex-1 p-0 mt-5"
                onSubmit={onSubmitHandler}
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-200 mb-12">
                    Create your account
                </h1>
                {apiError && (
                    <p className="text-md text-red-900 font-medium p-3 bg-red-200 rounded-lg w-full mb-6">
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
                <p className="text-sm lg:text-md text-gray-400 w-full text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="font-medium text-primary">
                        Login
                    </Link>
                </p>
            </form>
            <hr className="w-full my-8 lg:w-48 lg:rotate-90 border-gray-800 max-w-md" />
            <SocialLoginButtons />
        </div>
    );

    function onChangeHandler(e) {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    }
    async function onSubmitHandler(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const apiResult = await authServices.signup(signupData);

            if (apiResult.ok === false) {
                setApiError(apiResult.error);
                setTimeout(() => setApiError(""), 4000);
                return null;
            }
            setSignedUpUser(apiResult.data);
            changePage();
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
            setLoading(false);
        }
    }
}
