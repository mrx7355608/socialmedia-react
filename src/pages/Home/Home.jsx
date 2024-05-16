// COMPONENTS
import RightSideBar from "./RightSideBar/RightSideBar";
import Timeline from "./Timeline";
import { PostForm } from "../../components/posts";

// CONTEXT
import TimelineProvider from "../../contexts/timeline";

export default function Home() {
    return (
        <div className="px-3 py-0 w-full lg:w-1/3 mx-auto mt-5 overflow-hidden">
            <RightSideBar />

            <div className="flex flex-col items-center justify-start min-h-screen">
                <TimelineProvider>
                    <PostForm />
                    <Timeline />
                </TimelineProvider>
            </div>
        </div>
    );
}
