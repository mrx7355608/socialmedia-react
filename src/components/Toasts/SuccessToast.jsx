import { stringProp } from "../../utils/propTypes";

export default function SuccessToast({ success }) {
    return (
        <div className="toast toast-top toast-end top-32 lg:top-14">
            <div className="alert alert-success bg-green-400">
                <span>{success}</span>
            </div>
        </div>
    );
}

SuccessToast.propTypes = {
    success: stringProp,
};
