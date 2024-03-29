import { stringProp } from "../../utils/propTypes";

export default function ErrorToast({ error }) {
    return (
        <div className="toast toast-top toast-end top-32 lg:top-14">
            <div className="alert alert-error bg-red-400">
                <span>{error}</span>
            </div>
        </div>
    );
}

ErrorToast.propTypes = {
    error: stringProp,
};
