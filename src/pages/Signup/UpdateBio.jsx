export default function UpdateBio() {
    return (
        <div className="w-full">
            <h1 className="text-3xl text-gray-200 font-bold mb-4 text-center mt-3">
                Update Bio
            </h1>
            <textarea
                className="textarea textarea-primary resize-none bg-transparent w-full mb-3"
                placeholder="Let people know about you."
                rows={4}
            ></textarea>
            <button className="btn btn-primary">Complete</button>
        </div>
    );
}
