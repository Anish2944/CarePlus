import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import { v4 as uuidv4 } from 'uuid';
import { getDayOfWeek } from "../utils/getdayofweek.js";


const createAppointment = asyncHandler(async (req, res) => {
    const { doctorId, patientId, appointmentDate, timeSlot } = req.body;

    const dayOfWeek = getDayOfWeek(appointmentDate); // "Monday", etc.

    const doctor = await Doctor.findOneAndUpdate(
        { 
            _id: doctorId,
            "available_time_slots.day": dayOfWeek,
            "available_time_slots.times.time": timeSlot,
            "available_time_slots.times.status": "available"
        },
        { 
            $set: { "available_time_slots.$[dayElem].times.$[timeElem].status": "booked" } 
        },
        { 
            arrayFilters: [{ "dayElem.day": dayOfWeek }, { "timeElem.time": timeSlot }],
            new: true 
        }
    );

    if (!doctor) {
        throw new ApiError(400, "Selected time slot is unavailable");
    }

    const appointment = await Appointment.create({
        doctorId,
        patientId,
        roomId: uuidv4(),
        appointmentDate,
        timeSlot: { day: dayOfWeek, time: timeSlot },
        status: "scheduled"
    });

    return res.status(201).json(new ApiResponse(201, appointment, "Appointment booked successfully"));
});



const getAppointmentById = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    if (!appointmentId) {
        throw new ApiError(400, "Appointment ID is required");
    }

    const appointment = await Appointment.findById(appointmentId).populate({
        path: "doctorId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    }).populate({
        path: "patientId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return res.status(200).json(new ApiResponse(200, appointment, "Appointment fetched successfully"));
});

const getAllAppointmentsForPatient = asyncHandler(async (req, res) => {
    const { patientId } = req.params;
    if (!patientId) {
        throw new ApiError(400, "Patient ID is required");
    }
    const appointments = await Appointment.find({ patientId: patientId }).populate({
        path: "doctorId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    }).populate({
        path: "patientId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    });

    if (!appointments) {
        throw new ApiError(404, "Appointments not found");
    }
    return res.status(200).json(new ApiResponse(200, appointments, "Appointments fetched successfully"));
});

const getAllAppointmentsForDoctor = asyncHandler(async (req, res) => {
    const { doctorId } = req.params;
    if (!doctorId) {
        throw new ApiError(400, "Doctor ID is required");
    }
    const appointments = await Appointment.find({ doctorId: doctorId }).populate({
        path: "doctorId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    }).populate({
        path: "patientId",
        populate: {
            path: "user_id",
            select: "-password -refreshToken"
        }
    });

    if (!appointments) {
        throw new ApiError(404, "Appointments not found");
    }

    return res.status(200).json(new ApiResponse(200, appointments, "Appointments fetched successfully"));
});

const cancelAppointment = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    if (!appointmentId) {
        throw new ApiError(400, "Appointment ID is required");
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    if (appointment.status !== "scheduled") {
        throw new ApiError(400, "Cannot cancel an appointment that is not scheduled");
    }

    // Update the appointment status to "cancelled"
    appointment.status = "cancelled";
    await appointment.save();

    // Update the doctor's specific slot to "available"
    await Doctor.updateOne(
        { _id: appointment.doctorId, "available_time_slots.day": appointment.appointmentDate, "available_time_slots.times.time": appointment.timeSlot },
        { $set: { "available_time_slots.$[dayElem].times.$[timeElem].status": "available" } },
        { arrayFilters: [{ "dayElem.day": appointment.appointmentDate }, { "timeElem.time": appointment.timeSlot }] }
    );

    return res.status(200).json(new ApiResponse(200, appointment, "Appointment cancelled and slot marked as available"));
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    if (!appointmentId) {
        throw new ApiError(400, "Appointment ID are required");
    }

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: "completed" }, { new: true });
    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return res.status(200).json(new ApiResponse(200, appointment, "Appointment status updated successfully"));
});

export {
    createAppointment,
    getAppointmentById,
    getAllAppointmentsForPatient,
    getAllAppointmentsForDoctor,
    cancelAppointment,
    updateAppointmentStatus
};  