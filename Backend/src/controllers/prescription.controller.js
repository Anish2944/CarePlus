import { asyncHandler } from "../utils/asyncHandler.js";
import { Prescription } from "../models/prescription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPrescription = asyncHandler(async (req, res) => {
    const { doctorId, patientId } = req.params;

    if (!doctorId || !patientId) {
        throw new ApiError(400, "Patient or doctor ID not found")
    }

    const {medication, dosage, instructions} = req.body;

    if (!medication || !dosage || !instructions) {
        throw new ApiError(404, "All fields are required")
    }

    const prescription = await Prescription.create({
        patientId,
        medication,
        dosage,
        instructions,
        doctorId
    });

    if (!prescription) {
        throw new ApiError(500, "Something went wrong while creating prescription")
    }

    return res.status(201).json(new ApiResponse(201, prescription, "Prescription created successfully"));
});

const getPrescriptionById = asyncHandler(async (req, res) => {
    const { prescriptionId } = req.params;

    if (!prescriptionId) {
        throw new ApiError(400, "Prescription ID not found")
    }    

    const prescription = await Prescription.findById(prescriptionId).populate("patientId").populate({
        path: "doctorId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    });    

    if (!prescription) {
        throw new ApiError(404, "Prescription not found")
    }

    return res.status(200).json(new ApiResponse(200, prescription, "Prescription fetched successfully"));
});

const getPrescriptionsForPatient = asyncHandler(async (req, res) => {
    const { patientId } = req.params;

    if (!patientId) {
        throw new ApiError(400, "Patient ID not found")
    }

    const prescriptions = await Prescription.find({ patientId }).populate({
        path: "doctorId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    });

    if (!prescriptions) {
        throw new ApiError(404, "Prescriptions not found")
    }

    return res.status(200).json(new ApiResponse(200, prescriptions, "Prescriptions fetched successfully"));
});

const updatePrescription = asyncHandler(async (req, res) => {
    const { prescriptionId } = req.params;

    if (!prescriptionId) {
        throw new ApiError(400, "Prescription ID not found")
    }

    const {medication, dosage, instructions} = req.body;

    if (!medication || !dosage || !instructions) {
        throw new ApiError(404, "All fields are required")
    }

    const prescription = await Prescription.findByIdAndUpdate(prescriptionId, {
        medication,
        dosage,
        instructions
    }, {
        new: true
    });

    if (!prescription) {
        throw new ApiError(500, "Something went wrong while updating prescription")
    }

    return res.status(200).json(new ApiResponse(200, prescription, "Prescription updated successfully"));
});

const deletePrescription = asyncHandler(async (req, res) => {
    const { prescriptionId } = req.params;

    if (!prescriptionId) {
        throw new ApiError(400, "Prescription ID not found")
    }

    const prescription = await Prescription.findByIdAndDelete(prescriptionId);

    if (!prescription) {
        throw new ApiError(500, "Something went wrong while deleting prescription")
    }

    return res.status(200).json(new ApiResponse(200, prescription, "Prescription deleted successfully"));
});

export {
    createPrescription,
    getPrescriptionById,
    getPrescriptionsForPatient,
    updatePrescription,
    deletePrescription
}