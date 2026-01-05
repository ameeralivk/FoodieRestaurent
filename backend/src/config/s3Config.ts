export const S3_CONFIG = {
  bucketName: process.env.S3_BUCKET_NAME!,
  region: process.env.AWS_REGION || "ap-south-1",
  baseUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${
    process.env.AWS_REGION || "ap-south-1"
  }.amazonaws.com`,
};
