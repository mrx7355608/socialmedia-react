import { useState } from "react";

export default function useUpdateProfilePicture() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    /*
     *********************************
      UPLOAD IMAGE FILE TO CLOUDINARY
     *********************************
     */

    async function uploadToCloudinary(pictureFile) {
        setLoading(true);

        // Append image and upload_preset in formdata
        const cloudName = "doemiclic";
        const fd = new FormData();
        fd.append("upload_preset", "socialmedia");
        fd.append("file", pictureFile);

        // Make request to cloudinary
        const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        try {
            const response = await fetch(cloudinaryUploadUrl, {
                method: "POST",
                body: fd,
            });
            const result = await response.json();
            return result.secure_url;
        } catch (err) {
            setApiError("An un-expected error occured");
            setLoading(false);
        }
    }

    /*
     ************************************************
      SAVE IMAGE URL PROVIDED BY CLOUDINARY ON SERVER
     ************************************************
     */
    async function uploadProfilePicture(pictureFile) {
        if (!pictureFile) {
            return setApiError("No image selected");
        }

        // Get uploaded image url from cloudinary
        const uploadedPictureURL = await uploadToCloudinary(pictureFile);
        // Save url on server
        const url = `${import.meta.env.VITE_SERVER_URL}api/v1/user`;
        const options = {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePicture: uploadedPictureURL }),
        };
        try {
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
