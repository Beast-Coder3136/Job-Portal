import mongoose from "mongoose";

const connectDB = async()=>{
  try{
     const res = await mongoose.connect(process.env.MONGO_URL);
  }
  catch(err){
    console.log(err);
  }

}

export default connectDB;