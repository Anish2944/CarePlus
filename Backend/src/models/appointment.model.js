import mongoose from "mongoose";
import { Schema } from "mongoose";

const appointmentSchema = new Schema({
    patientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    doctorId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true 
    },
    appointmentDate: { 
        type: Date, 
        required: true 
    },
    timeSlot: { 
        type: String,
        required: true
    },
    reason: { 
        type: String,
        required: true
    },
    status: { 
        type: String,
        enum: ['scheduled', 'cancelled', 'completed'],
        default: 'scheduled'
    }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
