import FriendsSection from "./FriendsSection";
import PendingRequestsSection from "./PendingRequestsSection";

export default function RightSideBar() {
    return (
        <div
            className="hidden fixed right-0 bottom-0 overflow-y-scroll lg:flex flex-col w-1/4"
            style={{ top: "60px" }}
        >
            <FriendsSection />
            <PendingRequestsSection />
        </div>
    );
}
