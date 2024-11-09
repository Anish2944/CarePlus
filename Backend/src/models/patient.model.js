import mongoose from "mongoose";
import { Schema } from "mongoose";

const patientSchema = new Schema({
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: { 
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    address: { 
        type: String 
    },
    blood_group: { 
        type: String,
    },
    medical_history: { 
        type: String 
    },
    emergency_contact: { 
        type: String 
    },
    insurance_details: { 
        type: String 
    },
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

export const Patient = mongoose.model('Patient', patientSchema);
