# API para Gestión de Imágenes en S3

Esta API permite la subida, obtención y eliminación de imágenes en un bucket de Amazon S3. Está construida utilizando Express.js y varias dependencias para facilitar el manejo de archivos, seguridad y configuración.

## Descripción

El controlador `upload.controller.js` contiene tres funciones principales: `uploadImages`, `getImage` y `deleteImage`. Estas funciones permiten subir, obtener y eliminar imágenes en un bucket de S3.

## Guía de Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/Hamipluf/Resto-Sync-Bucket.git
    cd Resto-Sync-Bucket
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
    ```env
    AWS_BUCKET_NAME=<tu_nombre_de_bucket>
    AWS_ACCESS_KEY_ID=<tu_access_key_id>
    AWS_SECRET_ACCESS_KEY=<tu_secret_access_key>
    AWS_REGION=<tu_region>
    ```

## Inicialización

Para iniciar el servidor, utiliza el siguiente comando:
```sh
npm start
