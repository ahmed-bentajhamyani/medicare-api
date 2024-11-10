const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all users
router.get("/", verifyToken, getUsers);

// get a user
router.get("/:id", verifyToken, getUser);

// add user
router.post("/", verifyToken, createUser);

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
