import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// DOTENV
import dotenv from "dotenv";
dotenv.config();
// Routs
import image from "./routes/image.route.js";
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Rutas
app.use("/api/image", image);

app.listen(PORT, () => {
  console.log("server en el puerto", PORT);
});
