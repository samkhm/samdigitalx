const express = require("express");
const {  getAllHobbies} = require("../controllers/hobbyController");
const {  getPortFolioProjects} = require("../controllers/projectController");
const {  getPortFolioServices} = require("../controllers/servicesController");
const {  getPortFolioSkills } = require("../controllers/skillsController");
const {  getAllTestimonies} = require("../controllers/testimonialsController");


const router = express.Router();

router.get("/hobby", getAllHobbies);
router.get("/project", getPortFolioProjects);
router.get("/services", getPortFolioServices);
router.get("/skills", getPortFolioSkills);
router.get("/testimony", getAllTestimonies);
module.exports = router;