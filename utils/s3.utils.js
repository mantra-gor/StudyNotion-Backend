const {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const client = require("../config/aws.config");
const { URL } = require("url");

const { S3_BUCKET_NAME, AWS_S3_REGION } = process.env;

async function getPresignedURL(key, expiresIn = 300) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(client, command, { expiresIn });
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
  return await client.send(command);
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

/**
 * Extracts the S3 object key from a given object URL.
 * @param {string} objectUrl - The full S3 object URL.
 * @returns {string|null} - The extracted key, or null if the URL is invalid.
 */
function extractS3Key(objectUrl) {
  try {
    const url = new URL(objectUrl);

    // Handle path-style URLs like: https://s3.amazonaws.com/bucket-name/key
    const pathSegments = url.pathname.split("/").filter(Boolean);

    if (url.hostname === "s3.amazonaws.com" && pathSegments.length >= 2) {
      // path-style: /bucket-name/key
      return pathSegments.slice(1).join("/");
    }

    // Handle virtual-hosted-style URLs: https://bucket-name.s3.amazonaws.com/key
    const hostParts = url.hostname.split(".");
    const isVirtualHosted = hostParts.length > 3 && hostParts[1] === "s3";

    if (isVirtualHosted) {
      // pathname starts with /key
      return decodeURIComponent(url.pathname.slice(1)); // remove leading '/'
    }

    // Other custom endpoint cases (like localstack)
    return decodeURIComponent(url.pathname.slice(1));
  } catch (err) {
    console.error("Invalid URL:", err.message);
    return null;
  }
}

module.exports = {
  putObject,
  getPresignedURL,
  extractS3Key,
  deleteSingleObject,
  deleteMultipleObject,
};
