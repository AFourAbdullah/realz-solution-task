const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateUserDetails,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getSingleUser,
} = require("../controllers/filecontroller");

const router = express.Router();

router.post("/uploadFile", loginUser);
router.get("/getFile", isAuthenticatedUser, getUserDetails);

module.exports = router;
