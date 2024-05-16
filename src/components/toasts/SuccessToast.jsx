import { stringProp } from "../../utils/propTypes";
import { FaCheck } from "react-icons/fa";

export default function SuccessToast({ success }) {
    return (
        <div className="toast toast-top toast-end top-32 lg:top-14">
            <div className="alert alert-success bg-green-400">
                <FaCheck size={20} />
                <span>{success}</span>
            </div>
        </div>
    );
}

SuccessToast.propTypes = {
    success: stringProp,
};
