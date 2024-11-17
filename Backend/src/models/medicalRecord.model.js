import mongoose from "mongoose";
import { Schema } from "mongoose";

const medicalRecordSchema = new Schema({
    patientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    diagnosis: { 
        type: String,
        required: true 
    },
    treatment: { 
        type: String,
        required: true
    },
    notes: { 
        type: String,
        required: true 
    },
    prescriptionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Prescription',
        required: true
    },
    doctorId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Doctor',
        required: true 
    }
}, { timestamps: true });

export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
