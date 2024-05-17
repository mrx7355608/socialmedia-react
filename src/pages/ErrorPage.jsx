export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-roboto">
            <h1 className="text-4xl font-bold text-red-400 mb-3">
                Something went wrong!
            </h1>
            <p>We encountered an un-expected error.</p>
        </div>
    );
}
