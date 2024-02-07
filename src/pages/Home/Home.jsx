import FriendBar from "../../components/Friends/FriendBar";
import MobileMenu from "../../components/Navbar/MobileMenu";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
    return (
        <>
            <Navbar />
            <MobileMenu />
            <div className="flex justify-between">
                <Sidebar />
                <FriendBar />
            </div>
        </>
    );
}
