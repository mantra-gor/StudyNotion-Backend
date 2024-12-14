const {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const client = require("../config/aws.config");

const { S3_BUCKET_NAME, AWS_S3_REGION } = process.env;

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  return url;
}

async function putObject({ filename, contentType, folder, public = false }) {
  const key = keyGenerator(filename, folder);
  // Create the command with or without ACL based on the 'public' parameter
  const commandConfig = {
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  };
  if (public) {
    commandConfig.ACL = "public-read"; // Add ACL only if public is true
  }
  const command = new PutObjectCommand(commandConfig);
  // Generate the signed URL for uploading
  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  const objectUrl = `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${key}`;
  return { url, key, objectUrl };
}

async function deleteSingleObject(key) {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });
  await client.send(command);
}

async function deleteMultipleObject(keys) {
  const command = new DeleteObjectsCommand({
    Bucket: S3_BUCKET_NAME,
    Delete: {
      Objects: keys,
    },
  });
  await client.send(command);
}

function keyGenerator(filename, folder) {
  // Extract the file extension
  const extension = filename.split(".").pop();
  // Extract and sanitize the base name
  const baseName = filename.substring(0, filename.lastIndexOf(".")) || filename;
  const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, "");
  // Generate a unique timestamp
  const timestamp = Date.now();
  // Construct and return the key
  return `uploads/${folder}/${sanitizedBaseName}-${timestamp}.${extension}`;
}

module.exports = {
  getObjectURL,
  putObject,
  deleteSingleObject,
  deleteMultipleObject,
};
