import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from './ApiError.js';


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Upload an image
    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;
            const uploadResult = await cloudinary.uploader
            .upload(
                localFilePath, {
                    resource_type: 'auto',
                }
            )
            // console.log("File uploded on CLodinary", uploadResult.url);
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }            
            return uploadResult;
        } catch (error) {
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }             // remove loaclly saved temporary file 
            return null;
        }
    } 
    const extractPublicId = (avatarUrl) => {
        if (!avatarUrl) {
            throw new Error("Avatar URL is undefined or invalid.");
        }
        const urlParts = avatarUrl.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        return publicId;
    };
    
      const deleteFromCloudinary = async (url) => {
        if (!url) {
            console.log("No URL provided for deletion.");
            return;
        }
        const publicId = extractPublicId(url);
        const isVideo = url.match(/\.(mp4|avi|mkv|mov)$/i);
        try {
            const result = await cloudinary.uploader.destroy(publicId, {
                resource_type: isVideo ? "video" : "image", // Set the resource type dynamically
            });
            console.log("Cloudinary deletion result:", result);
    
            if (result.result !== "ok") {
                throw new ApiError(500, "Existing file could not be deleted from Cloudinary");
            }
    
            return result;
        } catch (error) {
            console.error("Error during Cloudinary deletion:", error);
            throw new ApiError(500, "Existing file could not be deleted from Cloudinary");
        }
    };    
     

export {uploadOnCloudinary,deleteFromCloudinary}