import { stringProp } from "../../utils/propTypes";

export default function ErrorBox({ error }) {
    return (
        <>
            {error && (
                <p className="font-medium text-red-900 bg-red-200 w-full p-3 rounded-lg">
                    {error}
                </p>
            )}
        </>
    );
}

ErrorBox.propTypes = {
    error: stringProp,
};
