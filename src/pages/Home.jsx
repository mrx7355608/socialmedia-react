import { PostForm } from "../components/posts";
import { RightSideBar } from "../components/sidebar";
import PostsContainer from "../containers/PostsContainer";

export default function Home() {
    return (
        <div className="px-3 py-0 w-full lg:w-1/3 mx-auto mt-5 overflow-hidden">
            <RightSideBar />

            <div className="flex flex-col items-center justify-start min-h-screen gap-4">
                <PostForm />
                <PostsContainer endpoint="/api/v1/posts/timeline" />
            </div>
        </div>
    );
}
