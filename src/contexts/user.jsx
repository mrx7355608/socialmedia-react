import { createContext, useContext, useState } from "react";

const userInitialState = {
    user: null,
    setUser: () => undefined,
};

const UserContext = createContext(userInitialState);
export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line
export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
