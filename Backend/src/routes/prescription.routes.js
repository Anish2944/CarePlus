import { Router } from "express";
import { createPrescription, getPrescriptionById, getPrescriptionsForPatient,updatePrescription, deletePrescription } from "../controllers/prescription.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-prescription").post(createPrescription);
router.route("/get-prescription/:prescriptionId").get(getPrescriptionById);
router.route("/get-prescriptions-for-patient").get(getPrescriptionsForPatient);
router.route("/update-prescription/:prescriptionId").patch(updatePrescription);
router.route("/delete-prescription/:prescriptionId").delete(deletePrescription);
export default router;