import { axiosAgent } from "../utils/axiosAgent";

export default function CloudinaryServices() {
    const upload = async (file) => {
        const cloudName = "doemiclic";
        const fd = new FormData();
        fd.append("upload_preset", "socialmedia");
        fd.append("file", file);

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const response = await axiosAgent.post(url, fd, {
            withCredentials: false,
        });
        return response.data;
    };

    return { upload };
}
