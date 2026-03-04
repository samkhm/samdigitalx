const express = require("express");
const { protect, authorize} = require("../middlewares/auth");
const  upload  = require("../middlewares/upload");
const uploadService = require('../middlewares/uploadService')
const uploadSkill = require('../middlewares/uploadSkill')
const { createHobby, getAllHobbies, updateHobby, deleteHobby} = require("../controllers/hobbyController");
const { createProject, getAllProjects, updateProject, deleteProject, toggleCompleted, addLanguage, removeLanguage} = require("../controllers/projectController");
const { createService, getAllServices, updateService, deleteService} = require("../controllers/servicesController");
const { createSkill, getAllSkills, updateSkill, deleteSkill} = require("../controllers/skillsController");
const { createTestimony, getAllTestimonies, deleteTestimonies, approveTestimony} = require("../controllers/testimonialsController");


const router = express.Router();

router.post("/hobby", protect, authorize(["admin"]), createHobby );
router.get("/hobby", getAllHobbies);
router.put("/hobby/:id", protect, authorize(["admin"]), updateHobby);
router.delete("/hobby/:id", protect, authorize(["admin"]), deleteHobby);

router.post("/project", protect, authorize(["admin"]),  upload.single("file"), // 👈 add Multer middleware here
  createProject
);

router.get("/project", getAllProjects);
router.put(
  "/project/:id",
  protect,
  authorize(["admin"]),
  upload.single("file"), // handle file
  updateProject
);
router.delete("/project/:id", protect, authorize(["admin"]), deleteProject);
router.put("/project_complete/:id", protect, authorize(["admin"]), toggleCompleted);
// Add new language
router.patch("/project/:id/language", addLanguage);

// Remove language
router.delete("/project/:id/language", removeLanguage);



router.post(
  "/services",
  protect,
  authorize(["admin"]),
  uploadService.single("file"),
  createService
);

router.put(
  "/services/:id",
  protect,
  authorize(["admin"]),
  uploadService.single("file"),
  updateService
);

router.get("/services", getAllServices);

router.delete(
  "/services/:id",
  protect,
  authorize(["admin"]),
  deleteService
);

router.post("/skills", protect, authorize(["admin"]), uploadSkill.single('file'), createSkill);
router.get("/skills", getAllSkills);
router.put("/skills/:id", protect, authorize(["admin"]), uploadSkill.single('file'), updateSkill);
router.delete("/skills/:id", protect, authorize(["admin"]), deleteSkill);

router.get("/testimony", getAllTestimonies);
router.delete("/testimony/:id", protect, authorize(["admin"]), deleteTestimonies);
router.put("/testimony/:id", protect, authorize(["admin"]), approveTestimony)


module.exports = router;