import Profile from "../models/profile.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getProfile = catchAsync(async (req, res) => {
  const profile = await Profile.findOne().lean();
  res.json({ success: true, data: profile });
});

export const upsertProfile = catchAsync(async (req, res) => {
  const updates = { ...req.body };

  // Prevent invalid cast for embedded avatar
  if (updates.avatar === "" || updates.avatar === null) {
    delete updates.avatar;
  }

  const profile = await Profile.findOneAndUpdate({}, updates, {
    upsert: true,
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: profile });
});
