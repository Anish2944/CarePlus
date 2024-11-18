import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../models/feedback.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createFeedback = asyncHandler(async (req, res) => {
    const { rating, comments, appointmentId } = req.body;
    if (!rating || !appointmentId) {
        throw new ApiError(400, "All fields are required")
    }

    const feedback = await Feedback.create({
        rating,
        comments,
        user_id: req.user?._id,
        appointmentId
    });

    if (!feedback) {
        throw new ApiError(500, "Something went wrong while creating feedback")
    }

    return res.status(201).json(new ApiResponse(201, feedback, "Feedback created successfully"));
});

const getFeedbacksForDoctor = asyncHandler(async (req, res) => {

    const userId = req.user?._id;
    
    if (!userId) {
        throw new ApiError(400, "User ID not found")
    }

    const feedback = await Feedback.find({ userId }).populate('user_id').populate('appointmentId');

    if (!feedback) {
        throw new ApiError(500, "Something went wrong while fetching feedback")
    }

    return res.status(200).json(new ApiResponse(200, feedback, "Feedback fetched successfully"));
});  

const getFeedbackByAppointmentId = asyncHandler(async (req, res) => {    
    const { appointmentId } = req.params;

    if (!appointmentId) {
        throw new ApiError(400, "Appointment ID not found")
    }

    const feedback = await Feedback.find({ appointmentId }).populate({
        path: 'user_id',
        select: '-password -refreshToken'
    }).populate('appointmentId');

    if (!feedback) {
        throw new ApiError(500, "Something went wrong while fetching feedback")
    }

    return res.status(200).json(new ApiResponse(200, feedback, "Feedback fetched successfully"));
});

export { createFeedback, getFeedbacksForDoctor, getFeedbackByAppointmentId };