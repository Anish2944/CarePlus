import { Router } from "express";
import { createPatientProfile, getPatientById, updatePatientProfile, updateProfileImage, getPatientByUserId } from "../controllers/patient.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-profile").post(upload.single("profileImage"),createPatientProfile);
router.route("/profile/:patientId").get(getPatientById);
router.route("/profile").get(getPatientByUserId);
router.route("/update").patch(updatePatientProfile);
// router.route("/delete-profile/:patientId").delete(deletePatientProfile);
router.route("/update-image").patch(upload.single("profileImage"), updateProfileImage);

export default router;