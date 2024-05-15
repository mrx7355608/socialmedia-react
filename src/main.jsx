import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./contexts/user.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <App />
    </UserProvider>
);
