import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String 
    },
    status: { 
        type: String,
        default: 'unread',
        enum: ['unread', 'read']
    }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
