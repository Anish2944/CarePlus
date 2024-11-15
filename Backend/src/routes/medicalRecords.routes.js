import { Router } from "express";
import { createMedicalRecord, getMedicalRecordById, updateMedicalRecord, deleteMedicalRecord, getMedicalRecordsForPateint } from "../controllers/medicalRecord.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-medical-record/:patientId/:doctorId").post(createMedicalRecord);
router.route("/get-medical-record/:medicalRecordId").get(getMedicalRecordById);
router.route("/get-patient-records/:patientId").get(getMedicalRecordsForPateint);
router.route("/update-medical-record/:medicalRecordId").patch(updateMedicalRecord);
router.route("/delete-medical-record/:medicalRecordId").delete(deleteMedicalRecord);

export default router;