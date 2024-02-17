export default function CreateComment() {
    return (
        <div className="flex items-center justify-center p-3 absolute bottom-0 left-0 w-full">
            <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                className="rounded-full object-cover w-10 h-10"
            />
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mx-3"
            />
            <button className="btn btn-success">Post</button>
        </div>
    );
}
