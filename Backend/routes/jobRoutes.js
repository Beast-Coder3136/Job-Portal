import express from 'express';
import { getAllJobByAdmin, getAllJobs, getJobById, postJob } from '../controllers/jobController.js';
import verifyJWT from '../middlewares/authentication.js';
import checkRole from '../middlewares/checkRole.js';
const router = express.Router();

router.get("/get",verifyJWT,getAllJobs);
router.post("/post",verifyJWT,checkRole("recruiter"),postJob);
router.get("/get/:id",verifyJWT,getJobById);
router.get("/adminJob",verifyJWT,checkRole("recruiter"),getAllJobByAdmin);


export default router;