import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const doctorSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    profileImage: { 
        type: String 
    },
    specialization: { 
        type: String, 
        required: true 
    },
    fees: { 
        type: Number, 
        default: 0,
        required: true
    },
    qualification: { 
        type: String,
        required: true
    },
    experience: { 
        type: Number,
        required: true 
    },
    available_time_slots: {
        type: [{
            day: { type: String, required: true },
            times: [{
                time: { type: String, required: true },
                status: { type: String, default: "available", enum: ["available", "booked"] } // Track status of each slot
            }]
        }]
    }
}, { timestamps: true });

doctorSchema.plugin(mongooseAggregatePaginate)

export const Doctor = mongoose.model('Doctor', doctorSchema);
