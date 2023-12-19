// import dotenv from "dotenv";
// dotenv.config();
// import {
//   S3Client,
//   PutObjectCommand,
//   ListObjectsCommand,
//   GetObjectCommand,
// } from "@aws-sdk/client-s3";





// export async function getFiles() {
//   const command = new ListObjectsCommand({
//     Bucket: AWS_BUCKET_NAME,
//   });
//   return await client.send(command);
// }



// export async function downloadFile(filename) {
//   const command = new GetObjectCommand({
//     Bucket: AWS_BUCKET_NAME,
//     Key: filename,
//   });
//   const result = await client.send(command);
//   console.log(result);
//   result.Body.pipe(fs.createWriteStream(`./images/${filename}`));
// }

// export async function getFileURL(filename) {
//   const command = new GetObjectCommand({
//     Bucket: AWS_BUCKET_NAME,
//     Key: filename,
//   });
//   return await getSignedUrl(client, command, { expiresIn: 3600 });
// }
