import { booleanProp, funcProp } from "../../utils/propTypes";

export default function CommentMenu({ sharedStates, setSharedStates }) {
    return (
        <div className="ml-2 mt-1 text-sm">
            {sharedStates.inEditMode ? (
                sharedStates.isEditing ? (
                    <span className="mr-3 cursor-pointer hover:underline">
                        Editing...
                    </span>
                ) : (
                    <span
                        className="mr-3 cursor-pointer hover:underline"
                        onClick={closeEditMode}
                    >
                        Cancel
                    </span>
                )
            ) : (
                <span
                    className="mr-3 cursor-pointer hover:underline"
                    onClick={openEditMode}
                >
                    Edit
                </span>
            )}

            <span className="cursor-pointer hover:underline">Delete</span>
        </div>
    );

    function openEditMode() {
        setSharedStates({ ...sharedStates, inEditMode: true });
    }
    function closeEditMode() {
        setSharedStates({ ...sharedStates, inEditMode: false });
    }
}

CommentMenu.propTypes = {
    sharedStates: {
        isEditing: booleanProp,
        inEditMode: booleanProp,
    },
    setSharedStates: funcProp,
};
