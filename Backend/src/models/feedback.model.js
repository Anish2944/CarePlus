import mongoose from "mongoose";
import { Schema } from "mongoose";

const feedbackSchema = new Schema({
    rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5 
    },
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    comments: { 
        type: String 
    },
    appointmentId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Appointment', 
        required: true 
    }
}, { timestamps: true });

feedbackSchema.plugin(mongooseAggregatePaginate)
export const Feedback = mongoose.model('Feedback', feedbackSchema);
