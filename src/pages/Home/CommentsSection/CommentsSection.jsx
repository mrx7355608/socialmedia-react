import CommentBubble from "./CommentBubble";
import CreateComment from "./CreateComment";

export default function CommentsSection() {
    return (
        <>
            <dialog id="my_modal_4" className="modal p-0">
                <div
                    className="modal-box w-11/12 max-w-4xl p-0 relative"
                    style={{ height: "90vh" }}
                >
                    <h3 className="font-bold text-xl text-center mb-9 mt-5">
                        Comments
                    </h3>
                    <img
                        src="/close.png"
                        alt="close cross icon"
                        onClick={() => {
                            document.getElementById("my_modal_4").close();
                        }}
                        className="hover:cursor-pointer p-2 w-8 h-8 rounded-full hover:bg-gray-700 object-cover absolute top-5 right-6"
                    />
                    <div
                        className="p-4 overflow-y-auto"
                        style={{ height: "73%" }}
                    >
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                        <CommentBubble />
                    </div>
                    <CreateComment />
                </div>
            </dialog>
        </>
    );
}
