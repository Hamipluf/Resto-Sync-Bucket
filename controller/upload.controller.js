import dotenv from "dotenv";
dotenv.config();
// CustomResponses
import customResponses from "../utils/customResponses.js";
// DAOs
import ImageManager from "../persistencia/DAOs/images.s3.js";
import { client } from "../persistencia/awsS3.js";
// S3
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
// Path
import { extname } from "path";
const imageManager = new ImageManager();

export const uploadImages = async (req, res) => {
  const file = req.file;
  if (req.method !== "POST") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Metodo no permitido"));
  }
  if (!file) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "No se subió ningún archivo"));
  }
  const date = new Date().getTime();
  const uniqueKey = `${
    file.fieldname + "-" + date + extname(file.originalname)
  }`;
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uniqueKey,
    Body: file.buffer,
  };

  const upload = await imageManager.uploadImage(uploadParams);
  if (upload.$metadata.httpStatusCode !== 200 || upload.error) {
    return res
      .status(400)
      .json(
        customResponses.badResponse(400, "No se pudo subir el archivo", upload)
      );
  } else {
    return res.status(200).json(
      customResponses.responseOk(200, "Imagen subida correctamente.", {
        metadata: upload.$metadata,
        Key: uniqueKey,
      })
    );
  }
};
export const getImage = async (req, res) => {
  const { key } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Metodo no permitido"));
  }

  try {
    const getParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    const image = await imageManager.getOneImage(getParams);
    if (image.error) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(400, "Error en obtener la imagen.", image)
        );
    }
    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Imagen encontrada", { url: image })
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customResponses.responseOk(500, "Error en el servidor.", error));
  }
};
export const deleteImage = async (req, res) => {
  const { key } = req.params;
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Metodo no permitido"));
  }

  try {
    const getParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    const imageDeleted = await imageManager.deleteOneImage(getParams);
    if (imageDeleted.error) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en eliminar la imagen.",
            image
          )
        );
    }
    return res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          `Archivo con clave (Key) ${key} eliminado exitosamente de S3.`,
          imageDeleted.$metadata
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customResponses.responseOk(500, "Error en el servidor.", error));
  }
};
