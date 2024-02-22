import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-gray-100 text-center">
                Not Found
            </h1>
            <p className="mt-3 text-sm text-gray-500 px-5 text-center">
                The page you were trying to visit does not exist
            </p>
            <img
                src="/404.png"
                alt="not found illustration by icons8"
                className="w-3/4 lg:w-56 mx-auto mt-5"
            />
            <Link to="/">
                <button className="btn btn-outline btn-info mx-auto block mt-5">
                    Go to homepage
                </button>
            </Link>
        </div>
    );
}
