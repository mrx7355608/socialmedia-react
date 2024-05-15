import { useState } from "react";
import UserServices from "../api/user";
import CloudinaryServices from "../api/cloudinary";

export default function useUpdateProfilePicture() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const userServices = UserServices();
    const cloudinaryServices = CloudinaryServices();

    /*
     *********************************
      UPLOAD IMAGE FILE TO CLOUDINARY
     *********************************
     */
    async function uploadToCloudinary(file) {
        try {
            setLoading(true);
            const result = await cloudinaryServices.upload(file);
            return result.secure_url;
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
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

        const uploadedPictureURL = await uploadToCloudinary(pictureFile);

        try {
            const apiResult = await userServices.update({
                profilePicture: uploadedPictureURL,
            });

            if (apiResult.ok === false) {
                setApiError(apiResult.error);
                return null;
            } else {
                return apiResult.ok;
            }
        } catch (err) {
            setApiError("An un-expected error occured");
        } finally {
            setLoading(false);
        }
    }

    return { loading, apiError, uploadProfilePicture };
}
