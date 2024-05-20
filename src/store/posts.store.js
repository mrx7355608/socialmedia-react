import { create } from "zustand";

const usePostsStore = create((set) => ({
    posts: [],

    setPosts: (postsArray) => set((state) => (state.posts = postsArray)),

    filterPost: (postID) =>
        set((state) => state.posts.filter((p) => p._id !== postID)),

    addPostToList: (newPost) =>
        set((state) => (state.posts = [newPost, ...state.posts])),
}));

export default usePostsStore;
