const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    githubLink: { type: String },
    liveLink: { type: String },
    image: { type: String }, 
    imagePublicId: String,
    completed: { type: Boolean, default: false },
    tech: { type: [String], default: [] }, // ✅ add tech stack array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
