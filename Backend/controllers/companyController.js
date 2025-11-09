import Company from "../models/companyModel.js";
import cloudinary from "../utilis/cloudinary.js";
import getDataUri from "../utilis/datauri.js";

export const companyRegister = async(req,res)=>{
  try{
    const {companyName} = req.body;
    if(!companyName){
      return res.status(400).json({
        message : "Comapany Name is required",
        success : false,
      })
    }
    const company = await Company.findOne({name: companyName});
    if(company){
      return res.status(401).json({
        message : "Company Name is already Registered",
        succes : false
      })
    }
    const {userId} = req.user;
    const newCompany = new Company ({
      name  : companyName,
      UserId :userId
    });

    await newCompany.save();
    return res.status(200).json({
      message : "Company is registered successfully",
      company : newCompany,
      success : true
    })

  }
  catch(err){
    throw err;
  }
}

export const getAllCompanies = async(req,res)=>{
  try{
      const {userId} = req.user;
  const companies = await Company.find({UserId : userId});
  if(!companies){
    return res.status(404).json({
      message : "Companies not found",
      success : true
    })
  }
  return res.status(200).json({
    companies,
    success : true,
  })
  }
  catch(err){

  }
}

export const  getCompanyById = async(req,res)=>{
  try{
      let company_id = req.params.id;
  const company = await Company.findById(company_id);
  if(!company){
    return res.status(404).json({
      message : "Company does not exist with this id",
      success : false,
    })
  }
  return res.status(200).json({
    company,
    success : true
  })
  }
  catch(err){
    console.log(err);
  }
} 

export const updateCompany = async(req,res)=>{
  try{
    const { name , description , website ,location}  = req.body;
    const file = req.file;
    let cloudResponse ;
    if(file){
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
        folder : 'Job_Portal_Store/Company'
      })
    }
    let id = req.params.id;
    const updateData = {
      name  , 
      description, 
      website, 
      location,
    
    }
    const company = await Company.findByIdAndUpdate(id,updateData,{new : true});
    if(!company){
      return res.status(404).json({
        message : "Company not Found",
        success : true,
      })
    }
    if(cloudResponse){
      company.logo = cloudResponse.secure_url;
    }
    await company.save();
    
    return res.status(200).json({
      message : "Company Updated",
      success : true,
      company
    })
  }
  catch(err){
    console.log(err);
  }
}