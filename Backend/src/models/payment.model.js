import mongoose from "mongoose";
import { Schema } from "mongoose";

const paymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    amount: { type: Number, required: true },
    currency: { type: String },
    payment_date: { type: Date, default: Date.now },
    transaction_id: { type: String },
    method: { type: String },
    status: { type: String }
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);
