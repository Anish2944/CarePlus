import mongoose from "mongoose";
import { Schema } from "mongoose";

const prescriptionSchema = new Schema({
    patientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    medication: { 
        type: String, 
        required: true 
    },
    dosage: { 
        type: String 
    },
    instructions: { 
        type: String 
    },
    doctorId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true 
    }
}, { timestamps: true });

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
