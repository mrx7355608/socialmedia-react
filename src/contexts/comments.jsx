import { useContext, createContext, useState } from "react";

const initialState = {
    comments: null,
    setComments: () => null,
};

const CommentsContext = createContext(initialState);
export const useCommentsContext = () => useContext(CommentsContext);

export default function CommentsProvider({ children }) {
    const [comments, setComments] = useState(null);

    return (
        <CommentsContext.Provider value={{ comments, setComments }}>
            {children}
        </CommentsContext.Provider>
    );
}
