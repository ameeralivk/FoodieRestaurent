import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/Bucket";
export async function deleteFromS3(key: string) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    })
  );
}


export function getS3KeyFromUrl(url: string): string {
  const urlObj = new URL(url);
  return urlObj.pathname.substring(1); 
  // removes leading "/"
}

