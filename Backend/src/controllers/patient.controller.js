import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Patient } from "../models/patient.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const createPatientProfile = asyncHandler(async (req, res) => {
    const { date_of_birth, gender, address, blood_group, About, emergency_contact } = req.body;

    if (!date_of_birth || !gender || !blood_group) {
        throw new ApiError(400, "All * marked fields are required");
    }
    const profileImageLocalPath = req.file?.path;
    const profileImage = profileImageLocalPath ? await uploadOnCloudinary(profileImageLocalPath) : null;

    const existingProfile = await Patient.findOne({ user_id: req.user?._id });
    if (existingProfile) {
        throw new ApiError(400, "Patient profile already exists for this user");
    }

    const patient = await Patient.create({
        profileImage: profileImage.url || "",
        date_of_birth,
        gender,
        address,
        blood_group,
        About,
        emergency_contact,
        user_id: req.user?._id
    });

    const createdPatient = await Patient.findById(patient._id).populate({
        path: 'user_id',
        select: '-password -refreshToken'
    });

    if (!createdPatient) {
        throw new ApiError(404, "Patient profile not found");
    }

    return res.status(201).json(new ApiResponse(201, createdPatient, "Patient profile created successfully"));
});

const getPatientByUserId = asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ user_id: req.user?._id }).populate({
        path: 'user_id',
        select: '-password -refreshToken'
    });

    if (!patient) {
        throw new ApiError(404, "Patient profile not found");
    }

    return res.status(200).json(new ApiResponse(200, patient, "Patient profile fetched successfully"));
})

const getPatientById = asyncHandler(async (req, res) => {
    const { patientId } = req.params;
    if (!patientId) {
        throw new ApiError(400, "Patient not found")
    }
    const patient = await Patient.findById(patientId).populate({
        path: 'user_id',
        select: '-password -refreshToken'
    })

    if (!patient) {
        throw new ApiError(404, "Patient profile not found");
    }

    return res.status(200).json(new ApiResponse(200, patient, "Patient profile fetched successfully"));
});

const updatePatientProfile = asyncHandler(async (req, res) => {
    const { date_of_birth, gender, address, blood_group, About, emergency_contact } = req.body;

    const patient = await Patient.findOneAndUpdate(
        { user_id: req?.user._id },
        {
            date_of_birth,
            gender,
            address,
            blood_group,
            About,
            emergency_contact
        },
        { new: true }
    ).populate({
        path: 'user_id',
        select: '-password -refreshToken'
    })

    if (!patient) {
        throw new ApiError(404, "Patient profile not found");
    }

    return res.status(200).json(new ApiResponse(200, patient, "Patient profile updated successfully"));
});

// const deletePatientProfile = asyncHandler(async (req, res) => {
//     const { patientId } = req.params;
//     if (!patientId) {
//         throw new ApiError(400, "Patient not found")
//     }
//     const patient = await Patient.findByIdAndDelete(patientId).populate({
//         path: 'user_id',
//         select: '-password -refreshToken'
//     })

//     if (!patient) {
//         throw new ApiError(404, "Patient profile not deleted");
//     }

//     return res.status(200).json(new ApiResponse(200, patient, "Patient profile deleted successfully"));
// });

const updateProfileImage = asyncHandler(async (req, res) => {
    const ImageLocalpath = req.file?.path;
    if (!ImageLocalpath) {
        throw new ApiError(400, "Image file is missing");
    }

    const patientProfile = await Patient.findOne({ user_id: req.user?._id });
    if (!patientProfile) {
        throw new ApiError(404, "Patient profile not found");
    }

    if (patientProfile.profileImage) {
        await deleteFromCloudinary(patientProfile.profileImage);
    }

    const profileImage = await uploadOnCloudinary(ImageLocalpath);

    if (!profileImage.url) {
        throw new ApiError(400, "Error while uploading profile image");
    }

    patientProfile.profileImage = profileImage.url;
    await patientProfile.save();

    return res.status(200).json(new ApiResponse(200, patientProfile, "Profile image updated successfully"));
});

export {
    createPatientProfile,
    getPatientById,
    updatePatientProfile,
    updateProfileImage,
    getPatientByUserId
}
