import imageService from "../../services/image.service.js";

export default class ImageManager {
  // Sube una imagen al bucket
  async uploadImage(params) {
    try {
      const upload = await imageService.uploadImage(params);
      let response;
      upload.error
        ? (response = { error: true, message: upload.data })
        : (response = upload);
      return response;
    } catch (err) {
      console.log("ERROR uploadImage image.s3", err);
      return { error: true, data: err };
    }
  }
  // Obtiene una imagen
  async getOneImage(params) {
    try {
      const image = await imageService.getImage(params);
      let response;
      image.error
        ? (response = { error: true, message: image.data })
        : (response = image);
      return response;
    } catch (err) {
      console.log("ERROR getOneImage image.s3", err);
      return { error: true, data: err };
    }
  }
  // Elimina una imagen
  async deleteOneImage(params) {
    try {
      const image = await imageService.deleteImage(params)
      let response;
      image.error
        ? (response = { error: true, message: image.data })
        : (response = image);
      return response;
    } catch (err) {
      console.log("ERROR deleteImage image.s3", err);
      return { error: true, data: err };
    }
  }
}
