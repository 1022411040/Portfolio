import Contact from "../models/contact.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

export const submitContact = catchAsync(async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
    meta: {
      ip: req.ip,
      userAgent: req.get("user-agent"),
      referrer: req.get("referer"),
    },
  });
  res.status(201).json({ success: true, message: "Message sent" });
});

export const getContacts = catchAsync(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Contact.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: items,
    meta: { page: Number(page), limit: Number(limit), total },
  });
});

export const updateContactStatus = catchAsync(async (req, res) => {
  const { status, adminNote } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status, adminNote },
    { new: true }
  );
  if (!contact) throw new ApiError(404, "Message not found");
  res.json({ success: true, data: contact });
});
