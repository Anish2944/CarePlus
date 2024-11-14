import { Router } from "express";
import { createPatientProfile, getPatientById, updatePatientProfile, deletePatientProfile, updateProfileImage } from "../controllers/patient.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-profile").post(createPatientProfile);
router.route("/get-profile/:patientId").get(getPatientById);
router.route("/update-profile").patch(updatePatientProfile);
router.route("/delete-profile/:patientId").delete(deletePatientProfile);
router.route("/update-profile-image").patch(upload.single("profileImage"), updateProfileImage);

export default router;