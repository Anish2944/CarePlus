import { Router } from "express";
import { createMedicalRecord, getMedicalRecordById, updateMedicalRecord, deleteMedicalRecord, getMedicalRecordsForPateint } from "../controllers/medicalRecord.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create/:patientId/:doctorId").post(createMedicalRecord);
router.route("/:medicalRecordId").get(getMedicalRecordById);
router.route("/all-records/:patientId").get(getMedicalRecordsForPateint);
router.route("/update/:medicalRecordId").patch(updateMedicalRecord);
router.route("/delete/:medicalRecordId").delete(deleteMedicalRecord);

export default router;