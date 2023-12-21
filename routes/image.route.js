import { Router } from "express";
// Controller
import {
  deleteImage,
  getImage,
  uploadImages,
} from "../controller/upload.controller.js";
// Multer
import { upload } from "../config/multer.js";
// Passport
import passport from "passport";
// Middleware
import { isAutorizedUser } from "../middleware/isAutorizatedUser.middleware.js";
const router = new Router();
// Subir una imagen a AWS S3
router.post(
  "/upload",
  passport.authenticate("JWT", { session: false, passReqToCallback: true }),
  isAutorizedUser,
  upload.single("image"),
  uploadImages
);
// Obtener una imagen segun la Key
router.get(
  "/get/:key",
  passport.authenticate("JWT", { session: false }),
  isAutorizedUser,
  getImage
);
// Eliminar una imagen segun la Key
router.delete(
  "/delete/:key",
  passport.authenticate("JWT", { session: false }),
  isAutorizedUser,
  deleteImage
);

export default router;
