import express from "express";
import VideoController from "../controllers/video.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { createMediaValidator } from "../validators/models.validator.js"
 
const router = express.Router();

router.get("/", authUser, VideoController.getAllVideos); 
router.get("/public", VideoController.getPublicVideos);
router.get("/:id",authUser, VideoController.getPostById);
router.post("/", createMediaValidator, VideoController.create);
router.patch("/:id", createMediaValidator, VideoController.update);
router.delete("/:id", VideoController.delete);

export default router;