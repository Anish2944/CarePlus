import { Router } from "express";
import { createNotification, getNotifications, updateNotificationStatus, deleteNotification } from "../controllers/notifications.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-notification").post(createNotification);
router.route("/get-notifications/:userId").get(getNotifications);
router.route("/update-notification-status/:notificationId").patch(updateNotificationStatus);
router.route("/delete-notification/:notificationId").delete(deleteNotification);

export default router