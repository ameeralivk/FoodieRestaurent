import { S3_CONFIG } from "../config/s3Config";

export const getS3PublicUrl = (key?: string): string | undefined => {
  if (!key) return undefined;
  return `${S3_CONFIG.baseUrl}/${key}`;
};
