import FriendBar from "../../components/Friends/FriendBar";
import Timeline from "./Timeline/Timeline";

export default function Home() {
    return (
        <div className="w-1/3 mx-auto mt-5">
            <FriendBar />
            <Timeline />
        </div>
    );
}
