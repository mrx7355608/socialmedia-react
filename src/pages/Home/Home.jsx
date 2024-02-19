// COMPONENTS
import FriendBar from "../../components/Friends/FriendBar";
import Timeline from "./Timeline/Timeline";
import CreatePostBox from "./CreatePostBox";

// CONTEXT
import TimelineProvider from "../../contexts/timeline";

export default function Home() {
    return (
        <div className="w-1/3 mx-auto mt-5">
            <FriendBar />

            <div className="flex flex-col items-center justify-start min-h-screen">
                <TimelineProvider>
                    <CreatePostBox />
                    <Timeline />
                </TimelineProvider>
            </div>
        </div>
    );
}
