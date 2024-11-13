import { Router } from "express";
import { registerUser, loginUser, logout, accessRefreshToken, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.route("/logout").post(verifyJWT, logout)
router.route("/refresh-token").post(accessRefreshToken)
router.route("/current-user").get(verifyJWT,getCurrentUser)


export default router;
