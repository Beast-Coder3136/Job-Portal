import { application } from "express";
import mongoose , {Schema }from "mongoose";

const jobSchema = new Schema({
  title : { 
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  requirement : [{
    type : String,
  }],
  salary : {
    type : Number,
    required  : true,
  },
  experienceLevel : {
    type : Number,
    required : true
  },
  location : {
    type : String,
    required : true,
  },
  jobType : {
    type : String,
    required : true,
  },
  position : {
    type : Number,
    required : true,
  },
  company : {
    type : Schema.Types.ObjectId,
    ref : 'Company',
    required : true,
  },
  created_by : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  },
  applications : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Application'
    }
  ]

},{timestamps:true})

const Job = mongoose.model("Job",jobSchema)

export default Job;