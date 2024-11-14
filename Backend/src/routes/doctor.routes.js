import { Router } from "express";
import { createDoctor, getDoctorById, updateDoctorProfile, toggleDoctorStatus, getDoctors, updateProfileImage, updateAvailableTimeSlots } from "../controllers/doctor.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-doctor").post(upload.single("profileImage"), createDoctor);
router.route("/get-doctor/:doctorId").get(getDoctorById);
router.route("/update-doctor").patch(upload.single("profileImage"), updateDoctorProfile);
router.route("/toggle-doctor-status/:doctorId").patch(toggleDoctorStatus);
router.route("/get-doctors").get(getDoctors);
router.route("/update-profile-image").patch(upload.single("profileImage"), updateProfileImage);
router.route("/update-available-time-slots").patch(updateAvailableTimeSlots);

export default router;