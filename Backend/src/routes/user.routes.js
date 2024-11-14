import { Router } from "express";
import { registerUser, loginUser, logout, accessRefreshToken, getCurrentUser, updateAccountDetails, changeCurrentPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.route("/logout").post(verifyJWT, logout)
router.route("/refresh-token").post(accessRefreshToken)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").patch(verifyJWT,updateAccountDetails)
router.route("/change-password").patch(verifyJWT,changeCurrentPassword)

export default router;
