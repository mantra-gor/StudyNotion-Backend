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
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: `/uploads/${folder}/${filename}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 300 });
  return url;
}

async function initS3() {
  console.log(
    "URL: ",
    await putObject(`${Date.now}`, "image/jpeg", "thumbnails")
  );
}

module.exports = { getObjectURL, putObject, initS3 };
