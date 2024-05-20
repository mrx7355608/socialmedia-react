import { funcProp, stringProp } from "../../utils/propTypes";
import AcceptReqBtn from "./AcceptReqBtn";
import RejectReqBtn from "./RejectReqBtn";

export default function PendingRequestItem({ request, removeRequestFromList }) {
    return (
        <div className="flex flex-col items-start justify-center p-4 rounded-lg bg-myGray shadow w-full mb-3">
            <div className="flex items-center">
                <img
                    src={request.profilePicture}
                    alt="profile picture"
                    className="w-12 h-12 rounded-full object-cover inline mr-3"
                />
                <p className="text-gray-300 font-medium text-lg mb-0">
                    {request.fullname}
                </p>
            </div>
            <div className="flex w-full gap-2 mt-4">
                <AcceptReqBtn
                    requestID={request._id}
                    removeRequestFromList={removeRequestFromList}
                />
                <RejectReqBtn
                    requestID={request._id}
                    removeRequestFromList={removeRequestFromList}
                />
            </div>
        </div>
    );
}

PendingRequestItem.propTypes = {
    request: {
        _id: stringProp,
        fullname: stringProp,
        profilePicture: stringProp,
    },
    removeRequestFromList: funcProp,
};
