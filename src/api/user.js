import { axiosAgent } from "../utils/axiosAgent";

export function UserServices() {
    const updateBio = async (bio) => {
        const response = await axiosAgent.patch(
            "/",
            { bio },
            { withCredentials: true }
        );
        return response.data;
    };

    return {
        updateBio,
    };
}
