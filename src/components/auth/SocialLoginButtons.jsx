export default function SocialLoginButtons() {
    const continueWithGoogle = () => {
        window.open(
            `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/google`,
            "_self"
        );
    };
    return (
        <div className="flex-1 max-w-md">
            <button
                onClick={continueWithGoogle}
                className="btn btn-neutral w-full font-medium rounded-full relative"
            >
                <img
                    src="/google.png"
                    alt="fb-icon"
                    className="w-6 absolute top-3 left-3"
                />
                Continue with Google
            </button>
            <button
                onClick={() => alert("This feature will be added soon")}
                className="mt-4 btn btn-neutral w-full font-medium rounded-full relative"
            >
                <img
                    src="/guest.png"
                    alt="fb-icon"
                    className="w-5 absolute top-3 left-4"
                />
                Continue as guest
            </button>
        </div>
    );
}
