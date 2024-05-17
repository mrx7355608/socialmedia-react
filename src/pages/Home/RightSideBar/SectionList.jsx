import { arrayProp } from "../../../utils/propTypes";
import SectionItem from "./SectionItem";

export default function SectionList({ data }) {
    return (
        <>
            {data.map((c, idx) => {
                return <SectionItem user={c} key={idx} />;
            })}
        </>
    );
}

SectionList.propTypes = {
    data: arrayProp,
};
