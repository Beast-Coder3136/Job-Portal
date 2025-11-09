import Application from "../models/applicationModel.js";
import Job from "../models/jobsModel.js";


export const applyJob = async (req, res) => {
  try {
    let { userId } = req.user;
    let { id } = req.params;
    // check if id in params exist 
    console.log(id);
    if (!id) {
      return res.status(404).json({
        message: "Job Id is required",
        success: false
      })
    }
    // check if the job with that id exist 
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        message: "Invalid Job id",
        success: false,
      })
    }
    // check whether applicant has already applied for that job
    const application = await Application.findOne({ job: id, applicant: userId });
    if (application) {
      return res.status(400).json({
        message: "User has already applied for this job",
        success: false,
      })
    }
    const newApplication = new Application({
      job: id,
      applicant: userId
    })
    job.applications.push(newApplication);
    await job.save();
    await newApplication.save();

    return res.status(200).json({
      message: "Application Successfull",
      success: true
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const getAppliedJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const applications = await Application.find({ applicant: userId }).populate({
      options: { sort: { createdAt: -1 } },
      path: 'job',
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } },
      }
    });

    if (!applications) {
      return res.status(400).json({
        message: "You did not applied for this job",
        success: false,
      })
    }
    return res.status(200).json({
      applications,
      success: true,
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const getApplicant = async (req, res) => {
  try {
    let jobId = req.params.id;
    const jobs = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',
      }
    })
    if (!jobs) {
      return res.status(404).json({
        message: "Applications not found",
        success: false,
      })
    }
    return res.status(200).json({
      applicants : jobs.applications,
      success: true
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (status && (status == "accepted" || status == "rejected")) {
      if (!id) {
        return res.status(400).json({
          message: "Invalid Application Id",
          success: false
        })
      }
      const application = await Application.findByIdAndUpdate(id, { status: status }, { new: true });
      if (!application) {
        res.status(400).json({
          message: "No Application is Found",
          success: false
        })
      }
      return res.status(200).json({
        message: "Status Updated",
        success: true,
      })

    }
    else {
      return res.status(400).json({
        message: "Please Enter Valid status"
      })
    }
  }
  catch (err) {
    console.log(err);
  }
}

