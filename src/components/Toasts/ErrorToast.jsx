import { stringProp } from "../../utils/propTypes";

export default function ErrorToast({ error }) {
    return (
        <div className="toast toast-top toast-end top-14">
            <div className="alert alert-error">
                <span>{error}</span>
            </div>
        </div>
    );
}

ErrorToast.propTypes = {
    error: stringProp,
};
