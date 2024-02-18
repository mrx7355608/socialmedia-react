import { useContext, createContext, useState } from "react";

const initialState = {
    post: null,
    setPost: () => null,
};

const PostContext = createContext(initialState);
export const usePostContext = () => useContext(PostContext);

export default function PostProvider({ children }) {
    const [post, setPost] = useState(null);

    return (
        <PostContext.Provider value={{ post, setPost }}>
            {children}
        </PostContext.Provider>
    );
}
