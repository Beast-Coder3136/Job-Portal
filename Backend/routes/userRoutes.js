import  express from "express";
import { login, logout, register, updataProfile } from "../controllers/userController.js";
import verifyJWT from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post("/register",singleUpload,register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/profile/update",verifyJWT,singleUpload,updataProfile);

export default router;