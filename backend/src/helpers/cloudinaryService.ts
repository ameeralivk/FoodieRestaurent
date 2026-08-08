import cloudinary from "../config/cloudinaryConfig";

type CloudinaryResourceType = "image" | "video" | "raw";

export function getCloudinaryPublicIdFromUrl(url: string): string {
  const uploadSegment = "/upload/";
  const uploadIndex = url.indexOf(uploadSegment);
  if (uploadIndex === -1) return "";

  let path = url.substring(uploadIndex + uploadSegment.length);
  path = path.replace(/^v\d+\//, ""); // strip version segment, e.g. v1699999999/

  const lastDot = path.lastIndexOf(".");
  if (lastDot !== -1) path = path.substring(0, lastDot);

  return path;
}

export function getCloudinaryResourceTypeFromUrl(
  url: string
): CloudinaryResourceType {
  if (url.includes("/video/upload/")) return "video";
  if (url.includes("/raw/upload/")) return "raw";
  return "image";
}

export async function deleteFromCloudinary(url: string): Promise<void> {
  const publicId = getCloudinaryPublicIdFromUrl(url);
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId, {
    resource_type: getCloudinaryResourceTypeFromUrl(url),
  });
}
