import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";
import User from "../models/userModel.js";
const router = express.Router();

router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/").post(registerUser);
router.route("/").get(protect, admin, getUsers);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id").get(protect, admin, getUserById);
router.route("/:id").put(protect, admin, updateUser);

export default router;
