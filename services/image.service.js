import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { client } from "../persistencia/awsS3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
class ImageService {
  // Sube una imagen a S3
  uploadImage = async (params) => {
    try {
      const command = new PutObjectCommand(params);
      const response = await client.send(command);
      return response;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene un archivo
  getImage = async (params) => {
    const uniqueParam = Date.now().toString(); // Genera un parámetro único con la marca de tiempo actual
    try {
      const command = new GetObjectCommand(params);
      const response = await client.send(command);
      const signedUrl = await getSignedUrl(client, command, {
        expiresIn: 3600,
        query: { uniqueParam }, // Agrega el parámetro único a la URL
        forcePathStyle: true,
      });
      return signedUrl;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Eliminar una imagen
  deleteImage = async (params) => {
    try {
      const deleteObjectCommand = new DeleteObjectCommand(params);
      const response = await client.send(deleteObjectCommand);
      return response;
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const imageService = new ImageService();

export default imageService;
