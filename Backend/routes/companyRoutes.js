import express from 'express';
import { companyRegister, getAllCompanies, getCompanyById, updateCompany } from '../controllers/companyController.js';
import verifyJWT from '../middlewares/authentication.js';
import { singleUpload } from '../middlewares/mutler.js';
const router = express.Router();

router.post("/register",verifyJWT,companyRegister);
router.get("/get",verifyJWT,getAllCompanies);
router.get("/get/:id",verifyJWT,getCompanyById);
router.post("/update/:id",verifyJWT,singleUpload,updateCompany);

export default router;