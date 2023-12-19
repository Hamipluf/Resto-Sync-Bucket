import { Router } from "express";
// Controller
import { deleteImage, getImage, uploadImages } from "../controller/upload.controller.js";
// Multer
import { upload } from "../config/multer.js";
const router = new Router();
// Subir una imagen a AWS S3
router.post("/upload", upload.single("image"), uploadImages);
// Obtener una imagen segun la Key
router.get("/get/:key", getImage);
// Eliminar una imagen segun la Key
router.delete("/delete/:key", deleteImage)


export default router;
