import {Router} from "express";
import {createFeedback, getFeedbackByAppointmentId, getFeedbacksForDoctor} from "../controllers/feedback.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-feedback").post(createFeedback);
router.route("/get-feedback/:appointmentId").get(getFeedbackByAppointmentId);
router.route("/feedbacks-doctor").get(getFeedbacksForDoctor);

export default router