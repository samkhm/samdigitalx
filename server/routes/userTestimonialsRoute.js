const express = require("express");
const router = express.Router();
const { createTestimony } = require("../controllers/testimonialsController");

router.post("/testimony", createTestimony);


module.exports = router;