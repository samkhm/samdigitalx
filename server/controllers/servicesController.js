const Service = require("../models/Services");
const cloudinary = require("../config/cloudinary");


// ================= CREATE =================
exports.createService = async (req, res) => {
  try {
    const { title, short, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Service title is required" });
    }

    const existing = await Service.findOne({ title: title.trim() });
    if (existing) {
      return res.status(409).json({ message: "Service already exists" });
    }

    const serviceData = {
      title: title.trim(),
      short: short.trim(),
      description: description.trim(),
      owner: req.user.id,
    };

    if (req.file) {
      serviceData.image = req.file.path;
      serviceData.imagePublicId = req.file.filename;
    }

    const service = await Service.create(serviceData);

    res.status(201).json({
      message: "Service created successfully",
      data: service,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ================= GET ALL =================
exports.getAllServices = async (req, res) => {
  try {
    const { search } = req.query;

    const query = search?.trim()
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const services = await Service.find(query).sort({ createdAt: -1 });

    res.json(services);

  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
};


// ================= UPDATE =================
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (req.body.title) {
      service.title = req.body.title.trim();
    }

    if (req.body.short) {
      service.short = req.body.short.trim();
    }

    if (req.body.description) {
      service.description = req.body.description.trim();
    }

    // If new image uploaded
    if (req.file) {
      // delete old image
      if (service.imagePublicId) {
        await cloudinary.uploader.destroy(service.imagePublicId);
      }

      service.image = req.file.path;
      service.imagePublicId = req.file.filename;
    }

    const updated = await service.save();

    res.json({
      message: "Service updated successfully",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};


// ================= DELETE =================
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // delete image from cloudinary
    if (service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    await service.deleteOne();

    res.json({ message: "Service deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};


//portfolio
exports.getPortFolioServices = async (req, res) => {
  try{

    const service = await Service.find().select("title short description image");
    res.json(service);
  }      

   catch (err) {
    console.error("Error fetching service:", err);
    
  }
};