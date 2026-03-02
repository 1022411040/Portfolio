import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Upload single image to Cloudinary (stream-based)
 * Expects: multipart/form-data with field "image"
 */
export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file provided",
    });
  }

  const folder = req.query.folder || "portfolio";

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err?.message);
    throw new ApiError(500, "Image upload failed");
  }
};

/**
 * Delete image from Cloudinary
 * Expects: publicId in body
 */
export const deleteImage = async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({
      success: false,
      message: "publicId is required",
    });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error("Cloudinary deletion failed");
    }

    res.json({
      success: true,
      message: "Image deleted",
    });
  } catch (err) {
    console.error("Cloudinary delete error:", err?.message);
    throw new ApiError(500, "Image deletion failed");
  }
};
