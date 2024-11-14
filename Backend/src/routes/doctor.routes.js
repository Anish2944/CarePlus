import { Router } from "express";
import { createDoctor, getDoctorById, updateDoctorProfile, toggleDoctorStatus, getDoctors, updateProfileImage, updateAvailableTimeSlots, getAvailableSlotsForDoctor, getDoctorsBySpecialization } from "../controllers/doctor.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-doctor").post(upload.single("profileImage"), createDoctor);

router.route("/toggle-doctor-status/:doctorId").patch(toggleDoctorStatus);
router.route("/update-doctor").patch(updateDoctorProfile);
router.route("/update-profile-image").patch(upload.single("profileImage"), updateProfileImage);
router.route("/update-time-slots").patch(updateAvailableTimeSlots);

router.route("/get-doctor/:doctorId").get(getDoctorById);
router.route("/get-doctors").get(getDoctors);
router.route("/get-doctors-by-specialization").get(getDoctorsBySpecialization);
router.route("/get-available-slots-for-doctor/:doctorId").get(getAvailableSlotsForDoctor);

export default router;