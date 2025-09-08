import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // fixed spelling
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String], // better as array of skills/requirements
    required: true,
  },
experienceLevel: {
  type: mongoose.Schema.Types.Mixed, 
  required: true,
},

  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId, // fixed
    ref: "Company",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, // fixed
    ref: "User",
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId, // fixed
      ref: "Application",
    },
  ],
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
