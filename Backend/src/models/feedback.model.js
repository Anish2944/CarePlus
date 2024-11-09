import mongoose from "mongoose";
import { Schema } from "mongoose";

const feedbackSchema = new Schema({
    rating: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: { type: String },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true }
}, { timestamps: true });

export const Feedback = mongoose.model('Feedback', feedbackSchema);
