import express from "express";

import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./utilis/db.js";

//importing middleware ;
import userRoute from './routes/userRoutes.js';
import companyRoute from './routes/companyRoutes.js';
import jobRoute from './routes/jobRoutes.js';
import applicationRoute from "./routes/applicationRoutes.js";

dotenv.config({});

const app  = express();

// middlewares
app.use(cors({
  credentials : true,
  origin : 'http://localhost:5173'
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

// Starting our server 

const port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
  connectDB();
  console.log("server is running on port " + port);
})

