import express from "express";
import AlbumController from "../controllers/album.controller.js";
import { createAlbumValidator } from "../validators/models.validator.js";

const router = express.Router();

router.get("/", AlbumController.getAll);
router.get("/:id", AlbumController.getOne);
router.post("/", createAlbumValidator, AlbumController.create);
router.patch("/", createAlbumValidator, AlbumController.update);
router.delete("/", AlbumController.delete);

export default router;