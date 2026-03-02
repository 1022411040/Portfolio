import Skill from "../models/skill.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

const normalizeCategory = (cat) => {
  const map = {
    frontend: "Frontend",
    backend: "Backend",
    devops: "DevOps",
    tools: "Tools",
    other: "Other",
    database: "Other",
  };
  return map[String(cat).toLowerCase()] || cat;
};

export const createSkill = catchAsync(async (req, res) => {
  const data = { ...req.body };

  if (data.category) data.category = normalizeCategory(data.category);

  if (data.icon === "" || data.icon === null) {
    delete data.icon;
  } else if (typeof data.icon === "string") {
    data.icon = { url: data.icon };
  }

  const skill = await Skill.create(data);
  res.status(201).json({ success: true, data: skill });
});

export const getSkills = catchAsync(async (req, res) => {
  const { category, visible } = req.query;

  const query = {};
  if (visible !== undefined) {
    query.isVisible = visible === "true" || visible === true;
  }
  if (category) query.category = category;

  const skills = await Skill.find(query).sort({ order: 1, createdAt: -1 }).lean();
  res.json({ success: true, data: skills });
});


export const updateSkill = catchAsync(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) throw new ApiError(404, "Skill not found");
  res.json({ success: true, data: skill });
});

export const deleteSkill = catchAsync(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  res.json({ success: true, message: "Skill deleted" });
});

// Bulk reorder (drag & drop)
export const reorderSkills = catchAsync(async (req, res) => {
  const { orders } = req.body; // [{ id, order }]
  if (!Array.isArray(orders)) throw new ApiError(400, "Invalid payload");

  const ops = orders.map((o) => ({
    updateOne: {
      filter: { _id: o.id },
      update: { $set: { order: o.order } },
    },
  }));

  await Skill.bulkWrite(ops);
  res.json({ success: true, message: "Skills reordered" });
});
