import User from "../models/userModel.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utilis/datauri.js";
import cloudinary from "../utilis/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400)
        .json({
          message: "Something is Missing",
          success: false,
        });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400)
        .json({
          message: "User is already exit with this email",
          success: false,
        })
    }
    const file = req.file;
    let cloudResponse;
    if(file){
      const fileUri = getDataUri(file);
      cloudResponse = cloudinary.uploader.upload(fileUri.content, {
        folder : 'Job_Portal_Store'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    })
    if(cloudResponse){
      newUser.profile.profilePhoto = (await cloudResponse).secure_url;
    }
    await newUser.save();
    return res.status(201).json({
      message: "User is Registered",
      success: true
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400)
        .json({
          message: "Something is Missing",
          success: false,
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400)
        .json({
          message: "Incorrect Email or Password",
          success: false
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400)
        .json({
          message: "Incorrect Email or Password",
          success: false
        })
    }
    if (role != user.role) {
      res.status(400)
        .json({
          message: "Account doesn't exist with this role",
          success: false
        })
    }
    const tokenData = {
      userId: user._id,
      role: user.role,
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
    return res.status(200)
      .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
      .json({
        message: "You are logged In",
        user,
        success: true
      });

  }
  catch (err) {
    console.log(err);
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "You are Logged Out",
      success: true
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const updataProfile = async (req, res) => {
  try {
    const file = req.file;
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder : 'Job_Portal_Store'
      });
    }


    const { fullname, skills, bio, email, phoneNumber } = req.body;
    // const file = req.file;
    // cloudinary file setup 
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({
        message: "User is Unanuthorized",
        success: false,
      })
    }
    const user = await User.findById(userId);

    //udpating 
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (bio) user.profile.bio = bio;
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname
    }

    await user.save();
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message: "User is updated",
      user: updatedUser,
      success: true,
    })

  }
  catch (err) {
    console.log(err);
  }

}