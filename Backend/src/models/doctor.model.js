import mongoose from "mongoose";
import { Schema } from "mongoose";

const doctorSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    profile_pic: { 
        type: String 
    },
    specialization: { 
        type: String, 
        required: true 
    },
    fees: { 
        type: Number 
    },
    qualification: { 
        type: String 
    },
    years_of_experience: { 
        type: Number 
    },
    available_time_slots: {
        type: [{
            day: { type: String },
            time: { type: String }
        }]
    }
}, { timestamps: true });

export const Doctor = mongoose.model('Doctor', doctorSchema);
