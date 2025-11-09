import Job from "../models/jobsModel.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, salary, 
    experienceLevel, requirements, location, jobType, position, companyId } = req.body;
    const { userId } = req.user;
    if(!title ||!description ||!salary ||!jobType ||!position ||!location ||!userId ||!experienceLevel ||!companyId ){
      return res.status(400).json({
        message : "Something is Missing",
        success : false 
      })
    }
    const requirementArray = requirements.split(",");
    const newJob = new Job({
      title, description, requirements: requirementArray, salary : Number(salary), experienceLevel , location,
      jobType, position, company: companyId,
      created_by: userId,
    })
    await newJob.save();
    return res.status(201).json({
      message: "Job is Added",
      job : newJob,
      success: true
    })
  }
  catch (err) {
    console.log(err);
  }

}

export const getAllJobs = async(req,res)=>{
  try{
    const keyword = req.query.keyword ||"";
    const query = {
      $or : [
        {title : {$regex : keyword,$options : "i"}},
        {description : {$regex : keyword,$options : "i"} }
      ]
    }
    const jobs = await Job.find(query).populate('company');
    if(!jobs){
      return res.status(404).json({
        message : "Jobs Not FOUND",
        success : false
      })
    }
    return res.status(200).json({
      jobs,
      success : true
    })
  }catch(err){
    console.log(err);
  }
}

export const getJobById = async(req,res)=>{
  try{
    let jobId = req.params.id;
    const job = await Job.findById(jobId).populate('applications').populate('company');
    if(!job){
      return res.status(404).json({
        message : "Job does not exist with this id",
        success : false
      })
    }
    return res.status(200).json({
      job,
      success : true
    })
  }
  catch(err){
    console.log(err)
  }
}

export const getAllJobByAdmin = async(req,res)=>{
  try{
    const adminId = req.user.userId;
    const jobs = await Job.find({created_by : adminId}).populate([
      {path : 'applications'},
      {path : 'company'}
    ]);
    if(!jobs){
      return res.status(404).json({
        message : "NOT FOUND",
        success : true
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  }catch(err){
    console.log(err)
  }
}