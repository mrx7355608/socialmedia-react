import { useState } from "react";

export default function useUpdateProfilePicture() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    async function uploadToCloudinary(pictureFile) {
        setLoading(true);
        const cloudName = "doemiclic";
        const fd = new FormData();
        fd.append("upload_preset", "socialmedia");
        fd.append("file", pictureFile);

        const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const options = {
            method: "POST",
            body: fd,
        };
        try {
            const response = await fetch(cloudinaryUploadUrl, options);
            const result = await response.json();
            return result.secure_url;
        } catch (err) {
            setApiError("An un-expected error occured");
            setLoading(false);
        }
    }

    async function uploadProfilePicture(pictureFile) {
        if (!pictureFile) {
            return setApiError("No image selected");
        }
        const uploadedPictureURL = await uploadToCloudinary(pictureFile);

        // Upload to server
        const url = "http://localhost:8000/user";
        const options = {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePicture: uploadedPictureURL }),
        };
        try {
            // Upload image on cloudinary
            // Make request to server
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);
            if (result.ok === false) {
                setApiError(result.error);
                return null;
            }
            return result.ok;
        } catch (err) {
            setApiError("An un-expected error occured");
            setLoading(false);
        }
    }

    return { loading, apiError, uploadProfilePicture };
}
