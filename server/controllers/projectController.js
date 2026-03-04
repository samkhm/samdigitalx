const Project = require("../models/Projects");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;


exports.createProject = async (req, res) => {
  try {
    const { title, description, liveLink, githubLink } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const existing = await Project.findOne({ title: title.trim() });
    if (existing) {
      return res.status(409).json({ message: "Project title already exists" });
    }

    const projectData = {
      title: title.trim(),
      description: description.trim(),
      liveLink: liveLink?.trim() || "",
      githubLink: githubLink?.trim() || "",
    };

    if (req.file) {
      projectData.image = req.file.path;
      projectData.imagePublicId = req.file.filename;
    }

    const project = await Project.create(projectData);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    console.error("Create project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating project",
    });
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search && search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    console.error("Fetch projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error fetching projects",
    });
  }
};




exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updateData = {};

    if (req.body.title)
      updateData.title = req.body.title.trim();
    if (req.body.description)
      updateData.description = req.body.description.trim();

    if (req.body.githubLink)
      updateData.githubLink = req.body.githubLink.trim();

    if (req.body.liveLink)
      updateData.liveLink = req.body.liveLink.trim();

    // Handle tech parsing safely
    if (req.body.tech) {
      try {
        const parsedTech =
          typeof req.body.tech === "string"
            ? JSON.parse(req.body.tech)
            : req.body.tech;

        if (Array.isArray(parsedTech)) {
          updateData.tech = parsedTech;
        }
      } catch (err) {
        console.error("Tech parsing error:", err.message);
      }
    }

    // Handle image replacement
    if (req.file) {
      // delete old image if exists
      if (project.imagePublicId) {
        await cloudinary.uploader.destroy(project.imagePublicId);
      }

      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating project",
    });
  }
};

// Backend
exports.toggleCompleted = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json({
      success: true,
      project: updatedProject,
    });

  } catch (error) {
    console.error("Toggle completion error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ Add a single language to a project's tech stack
exports.addLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.body;

    if (!language || !language.trim()) {
      return res.status(400).json({ message: "Language is required please" });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { $addToSet: { tech: language.trim() } }, // prevents duplicates
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project); // ✅ return project directly
  } catch (error) {
    console.error("Failed to add language:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Remove a single language from a project's tech stack
exports.removeLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.body;

    if (!language || !language.trim()) {
      return res.status(400).json({ message: "Language is required" });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { $pull: { tech: language.trim() } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project); // ✅ return project directly
  } catch (error) {
    console.error("Failed to remove language:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete image first
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }

    await Project.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



//portfolio
exports.getPortFolioProjects = async (req, res) => {
  try{

    const project = await Project.find().select("title description image githubLink tech liveLink");
    res.json(project);
  }      

   catch (err) {
    console.error("Error fetching service:", err);
    
  }
};


