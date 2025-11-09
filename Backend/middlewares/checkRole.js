const checkRole = (role)=>{
  return async(req,res,next)=>{
    if(role == req.user.role){
      return next();
    }
    return res.status(400).json({
      message : "Role Not Authorized",
      success : false
    })
  }
}

export default checkRole;