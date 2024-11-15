import { asyncHandler } from "../utils/asyncHandler.js";
import { MedicalRecord } from "../models/medicalRecord.model.js";
import { ApiError } from "../utils/ApiError.js";    
import { ApiResponse } from "../utils/ApiResponse.js";

const createMedicalRecord = asyncHandler(async (req, res) => {
    const { patientId, doctorId } = req.params;
    if (!patientId || !doctorId) {
        throw new ApiError(400, "Patient ID or doctor ID not found")
    }

    const { dignoses, treatmeant, notes, prescriptionId } = req.body;

    if (!dignoses || !treatmeant || !notes || !prescriptionId) {
        throw new ApiError(400, "All fields are required")
    }

    const medicalRecord = await MedicalRecord.create({
        patientId,
        dignoses,
        treatmeant,
        notes,
        prescriptionId,
        doctorId
    });

    if (!medicalRecord) {
        throw new ApiError(500, "Something went wrong while creating medical record")
    }

    return res.status(201).json(new ApiResponse(201, medicalRecord, "Medical Record created successfully"));
});

const getMedicalRecordById = asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;

    if (!medicalRecordId) {
        throw new ApiError(400, "Medical Record ID not found")
    }

    const medicalRecord = await MedicalRecord.findById(medicalRecordId).populate("prescriptionId");

    if (!medicalRecord) {
        throw new ApiError(404, "Medical Record not found")
    }

    return res.status(200).json(new ApiResponse(200, medicalRecord, "Medical Record fetched successfully"));
});

const getMedicalRecordsForPateint = asyncHandler(async (req, res) => {
    const { patientId } = req.params;

    if (!patientId) {
        throw new ApiError(400, "Patient ID not found")
    }

    const medicalRecords = await MedicalRecord.find({ patientId });

    if (!medicalRecords) {
        throw new ApiError(404, "Medical Records not found")
    }

    return res.status(200).json(new ApiResponse(200, medicalRecords, "Medical Records fetched successfully"));
});

const updateMedicalRecord = asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;

    if (!medicalRecordId) {
        throw new ApiError(400, "Medical Record ID not found")
    }

    const { dignoses, treatmeant, notes, prescriptionId } = req.body;

    if (!dignoses || !treatmeant || !notes || !prescriptionId) {
        throw new ApiError(400, "All fields are required")
    }

    const medicalRecord = await MedicalRecord.findByIdAndUpdate(medicalRecordId, {
        dignoses,
        treatmeant,
        notes,
        prescriptionId
    }, {
        new: true
    });

    if (!medicalRecord) {
        throw new ApiError(404, "Medical Record not found")
    }

    return res.status(200).json(new ApiResponse(200, medicalRecord, "Medical Record updated successfully"));
});

const deleteMedicalRecord = asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;

    if (!medicalRecordId) {
        throw new ApiError(400, "Medical Record ID not found")
    }

    const medicalRecord = await MedicalRecord.findByIdAndDelete(medicalRecordId);

    if (!medicalRecord) {
        throw new ApiError(404, "Medical Record not found")
    }

    return res.status(200).json(new ApiResponse(200, medicalRecord, "Medical Record deleted successfully"));
});

export { createMedicalRecord, getMedicalRecordById, getMedicalRecordsForPateint, updateMedicalRecord, deleteMedicalRecord };
