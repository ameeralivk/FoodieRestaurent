// import multer, { FileFilterCallback } from "multer";
// import path from "path";
// import s3 from "./Bucket";
// import multerS3 from "multer-s3"
// import { Request } from "express";
// // Storage configuration
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "../uploads"));
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// //     const ext = path.extname(file.originalname);
// //     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
// //   },
// // });

// const storage = multerS3({
//   s3,
//   bucket: process.env.S3_BUCKET_NAME || "foodierestaurent",
//   key: (req: Request, file: Express.Multer.File, cb:(error: any, key?: string) =>void)=> {
//     const folder = "images/";
//     const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
//     cb(null, folder+filename);
//   },
// });

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   const allowedMimeTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "application/pdf",
//   ];

//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image and PDF files are allowed!"));
//   }
// };

// const uploadFile = multer({
//   storage:multer.memoryStorage(),
//   fileFilter,
// });

// export const upload = uploadFile.fields([
//   { name: "restaurantPhoto", maxCount: 1 },
//   { name: "proofDocument", maxCount: 1 },
// ]);

import multer, { FileFilterCallback } from "multer";
import path from "path";
import s3 from "./Bucket";
import multerS3 from "multer-s3";
import { Request } from "express";

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME || "foodierestaurent",
  key: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, key?: string) => void
  ) => {
    const folder = "images/";
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    cb(null, folder + filename);
  },
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

const itemImageStorage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME || "foodierestaurent",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, key?: string) => void
  ) => {
    const folder = "items/images/";
    const filename = `item-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, folder + filename);
  },
});

export const uploadItemImages = multer({
  storage: itemImageStorage,
  fileFilter: imageOnlyFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("images", 3);
