import express from "express";
import PhotoController from "../controllers/photo.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { createMediaValidator } from "../validators/models.validator.js"

const router = express.Router();

router.get("/", authUser, PhotoController.getAllPhotos); 
router.get("/public", PhotoController.getPublicPhotos);
router.get("/:id", authUser, PhotoController.getPhotoById);
router.post("/", createMediaValidator, PhotoController.create);
router.patch("/:id", createMediaValidator, PhotoController.update);
router.delete("/:id", PhotoController.delete);

export default router;