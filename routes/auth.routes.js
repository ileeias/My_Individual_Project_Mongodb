import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { createUserValidator } from "../validators/models.validator.js"

const router = express.Router();

router.post("/register", createUserValidator, AuthController.register); 
router.post("/login", AuthController.login);

export default router;