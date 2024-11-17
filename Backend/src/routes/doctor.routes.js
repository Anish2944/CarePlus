import { Router } from "express";
import { createDoctor, getDoctorById, updateDoctorProfile, toggleDoctorStatus, getDoctors, updateProfileImage, updateAvailableTimeSlots, getAvailableSlotsForDoctor, getDoctorsBySpecialization, getDoctorByUserId } from "../controllers/doctor.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(upload.single("profileImage"), createDoctor);

router.route("/toggle-status/:doctorId").patch(toggleDoctorStatus);
router.route("/update").patch(updateDoctorProfile);
router.route("/update-profile-image").patch(upload.single("profileImage"), updateProfileImage);
router.route("/time-slots").patch(updateAvailableTimeSlots);

router.route("/profile").get(getDoctorByUserId);
router.route("/profile/:doctorId").get(getDoctorById);
router.route("/all-doctors").get(getDoctors);
router.route("/specialization").get(getDoctorsBySpecialization);
router.route("/available-slots-for-doctor/:doctorId").get(getAvailableSlotsForDoctor);

export default router;