import { Router } from "express";
// Controller
import { uploadImages } from "../controller/upload.controller.js";
// Multer
import { upload } from "../config/multer.js";
const router = new Router();

router.post("/image", upload.single("archivo"), uploadImages);

export default router;
