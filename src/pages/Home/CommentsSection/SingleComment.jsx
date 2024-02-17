export default function SingleComment() {
    return (
        <div className="chat chat-start mt-2">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <div
                className="chat-bubble before:content-none rounded-full"
                style={{ borderEndStartRadius: "9999px" }}
            >
                It was said that you would, destroy the Sith, not join them.
            </div>
        </div>
    );
}
