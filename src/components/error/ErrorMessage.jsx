import { stringProp } from "../../utils/propTypes";

export default function ErrorMessage({ errorMessage }) {
    return <p className="text-red-500 text-center mt-4">{errorMessage}</p>;
}
ErrorMessage.propTypes = {
    errorMessage: stringProp,
};
