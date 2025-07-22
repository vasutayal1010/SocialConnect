import express from "express";
import {
  createStory,
  deleteStory,
  editProfile,
  followOrUnfollow,
  getAllStories,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
  SuggestedSearchUsers,
  uploadStoryMedia,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { toggleFollowUser } from "../controllers/userController.js";
import { SecrchUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePhoto"), editProfile);
router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);
router.post("/follow/:id", isAuthenticated, toggleFollowUser);
router.get('/search',isAuthenticated,SecrchUsers)
router.get("/suggested", isAuthenticated, SuggestedSearchUsers);

router.post("/getstoriesuri", upload.single("file"), uploadStoryMedia);
router.post("/stories", isAuthenticated , createStory);
router.get("/stories", isAuthenticated, getAllStories);

router.delete("/deletestories", isAuthenticated, deleteStory); 

export default router;
