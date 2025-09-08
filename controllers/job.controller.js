import { Job } from "../models/job.model.js";

//  🔹 Controller: postJob (Admin creates a new job)

export const postJob = async (req, res) => {
  try {
    // 📌 Extract fields from request body
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // 📌 User ID comes from isAuthenticated middleware (decoded from token)
    const userId = req.userId;

    // 📌 Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    // 📌 Create new job document in DB
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), 
      salary: Number(salary), 
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId, // store which admin created it
    });

    // 📌 Send success response
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    return res.status(500).json({
      message: "Server error while creating job.",
      success: false,
    });
  }
};

// 🔹 Controller: deleteJob (Admin deletes a job)
// Delete a job by ID
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while deleting job",
      success: false,
    });
  }
};




//🔹 Controller: getAllJobs (Students view jobs)
   
export const getAllJobs = async (req, res) => {
  try {
    // 📌 Extract keyword from query string (?keyword=developer)
    const keyword = req.query.keyword || "";

    // 📌 Search in title OR description (case-insensitive)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    // 📌 Return jobs list
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return res.status(500).json({
      message: "Server error while fetching jobs.",
      success: false,
    });
  }
};


   //🔹 Controller: getJobById (Student views single job)

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("company")        // ✅ This will bring company details
      .populate("applications");  // still keep applications populated

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error.message);
    return res.status(500).json({
      message: "Server error while fetching job.",
      success: false,
    });
  }
};


 // 🔹 Controller: getAdminJobs (Admin views own jobs)

export const getAdminJobs = async (req, res) => {
  try {
    // 📌 Get logged-in admin ID
    const adminId = req.userId;

    // 📌 Find all jobs created by this admin
   
    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });


    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin.",
        success: false,
      });
    }

   
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error.message);
    return res.status(500).json({
      message: "Server error while fetching admin jobs.",
      success: false,
    });
  }
};
