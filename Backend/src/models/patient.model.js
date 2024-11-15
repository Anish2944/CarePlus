import mongoose from "mongoose";
import { Schema } from "mongoose";

const patientSchema = new Schema({
    profileImage: {
        type: String,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: { 
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: { 
        type: String 
    },
    blood_group: { 
        type: String,
        required: true
    },
    About: { 
        type: String
    },
    emergency_contact: { 
        type: String 
    },
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

export const Patient = mongoose.model('Patient', patientSchema);
