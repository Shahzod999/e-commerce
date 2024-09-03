import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserbyId, getUserById, updateUserById } from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);

//Admin Routes
router.route("/:id").delete(authenticate, authorizeAdmin, deleteUserbyId).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById);

export default router;
