import mongoose from "mongoose";
import { Schema } from "mongoose";

const medicalRecordSchema = new Schema({
    patientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    record_date: { 
        type: Date, 
        default: Date.now 
    },
    diagnosis: { 
        type: String 
    },
    treatment: { 
        type: String 
    },
    notes: { 
        type: String 
    },
    prescription: { 
        type: Schema.Types.ObjectId, 
        ref: 'Prescription' 
    },
    doctorId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Doctor' 
    }
}, { timestamps: true });

export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
