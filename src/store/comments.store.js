import { create } from "zustand";

const useCommentsStore = create((set) => ({
    comments: [],
    setComments: (commentsArray) => set(() => ({ comments: commentsArray })),
    filterComment: (commentID) =>
        set((state) => ({
            comments: state.comments.filter((c) => c._id !== commentID),
        })),
}));

export default useCommentsStore;
