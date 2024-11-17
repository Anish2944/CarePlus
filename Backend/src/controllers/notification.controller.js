import { asyncHandler } from "../utils/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createNotification = asyncHandler(async (req, res) => {
    const { user_id, type, message } = req.body;

    if (!user_id || !type || !message) {
        throw new ApiError(400, "All fields (user_id, type, message) are required");
    }

    const notification = await Notification.create({
        user_id,
        type,
        message,
    });

    return res.status(201).json(new ApiResponse(201, notification, "Notification created successfully"));
});

const getNotifications = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { isRead } = req.query; // Optional filter for unread notifications

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const filter = { user_id: userId };
    if (isRead !== undefined) {
        filter.isRead = isRead === "true";
    }

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, notifications, "Notifications retrieved successfully"));
});

const updateNotificationStatus = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const { isRead } = req.body;

    if (isRead === undefined) {
        throw new ApiError(400, "isRead field is required");
    }

    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { isRead },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(new ApiResponse(200, notification, "Notification status updated successfully"));
});

const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "Notification deleted successfully"));
});

export {
    createNotification,
    getNotifications,
    updateNotificationStatus,
    deleteNotification,
};