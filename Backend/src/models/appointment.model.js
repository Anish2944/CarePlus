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
    appointment_date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String 
    },
    reason: { 
        type: String 
    },
    status: { 
        type: String 
    }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
