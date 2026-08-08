import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig";
import crypto from "crypto";
import { Request } from "express";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: "foodie/onboarding",
    public_id: `${file.fieldname}-${Date.now()}-${crypto.randomUUID()}`,
    resource_type: "auto",
  }),
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"));
  }
};

const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const upload = uploadFile.fields([
  { name: "restaurantPhoto", maxCount: 1 },
  { name: "proofDocument", maxCount: 1 },
]);

export const updateDocumentUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("proofDocument");

//image =================== upload
const imageOnlyFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const itemImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: "foodie/items/images",
    public_id: `item-${Date.now()}-${crypto.randomUUID()}`,
    resource_type: "image",
  }),
});

export const uploadItemImages = multer({
  storage: itemImageStorage,
  fileFilter: imageOnlyFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("images", 3);

export const updateItemImagesUpload = multer({
  storage: itemImageStorage,
  fileFilter: imageOnlyFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("images", 3);

//profileImage

const ProfileImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: "foodie/profile/images",
    public_id: `profile-${Date.now()}-${crypto.randomUUID()}`,
    resource_type: "image",
  }),
});

export const updateProfile = multer({
  storage: ProfileImageStorage,
  fileFilter: imageOnlyFilter, // ✅ add this
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profileImage");
