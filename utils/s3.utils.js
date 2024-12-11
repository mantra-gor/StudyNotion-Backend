const { GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const client = require("../config/aws.config");

const { S3_BUCKET_NAME } = process.env;

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  return url;
}

async function putObject(filename, contentType, folder) {
  const key = keyGenerator(filename, folder);
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  return { url, key };
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

module.exports = { getObjectURL, putObject };
