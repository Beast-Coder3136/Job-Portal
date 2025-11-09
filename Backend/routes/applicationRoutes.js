import express from 'express';
import { applyJob, getApplicant, getAppliedJob, updateStatus } from '../controllers/applicationController.js';
import verifyJWT from '../middlewares/authentication.js';
import checkRole from '../middlewares/checkRole.js';
const router = express.Router();


router.post("/apply/:id",verifyJWT,checkRole("student"),applyJob);
router.get("/get",verifyJWT,checkRole("student"),getAppliedJob);
router.get("/applicants/:id",verifyJWT,getApplicant);
router.post("/update/status/:id",verifyJWT,checkRole("recruiter"),updateStatus);

export default router;