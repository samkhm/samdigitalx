const express = require("express");
const { signup, login, getUsers, updateUserInfo, deleteUser, getProfile, updateProfile} = require("../controllers/authAdminController");
const router = express.Router();
const { protect, authorize} = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", protect, authorize(["admin"]), getUsers);
router.put('/updateUserInfo/:id', protect, authorize("admin", "moderator"), updateUserInfo)
router.delete('/deleteUser/:id', protect, authorize("admin", "moderator"), deleteUser)
router.get('/getProfile/:id', protect, getProfile)
router.put('/updateProfile/:id', protect, updateProfile)

module.exports = router;