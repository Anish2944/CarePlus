import {Router} from "express";
import {createAppointment, getAppointmentById, getAllAppointmentsForPatient, getAllAppointmentsForDoctor, cancelAppointment, updateAppointmentStatus} from "../controllers/appointment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-appointment").post(createAppointment);

router.route("/get-appointment/:appointmentId").get(getAppointmentById);
router.route("/get-all-appointments-for-patient").get(getAllAppointmentsForPatient);
router.route("/get-all-appointments-for-doctor").get(getAllAppointmentsForDoctor);

router.route("/cancel-appointment/:appointmentId").patch(cancelAppointment);
router.route("/update-appointment-status/:appointmentId").patch(updateAppointmentStatus);


export default router