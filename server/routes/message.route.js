import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { getMessage, sendMessage, sendMessagee } from "../controllers/messageController.js";


const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/all/:id").get(isAuthenticated, getMessage);

//router.post("/send/:id", isAuthenticated, upload.single("image"), sendMessagee);

export default router;
