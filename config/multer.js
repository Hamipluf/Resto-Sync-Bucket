import multer from "multer";

// Configuración de Multer
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });
