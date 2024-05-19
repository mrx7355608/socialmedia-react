import { stringProp } from "../../utils/propTypes";

export default function ErrorMessage({ errorMessage }) {
    return <p className="text-red-500 mx-auto mt-2">{errorMessage}</p>;
}
ErrorMessage.propTypes = {
    errorMessage: stringProp,
};
