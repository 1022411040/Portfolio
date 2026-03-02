import Project from "../models/project.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

// Helper: whitelist update fields
const pickProjectFields = (body) => {
  const allowed = [
    "title",
    "slug",
    "shortDescription",
    "description",
    "techStack",
    "features",
    "category",
    "status",
    "images",
    "links",
    "liveUrl",
    "githubUrl",
    "isFeatured",
    "isVisible",
    "seo",
    "publishedAt",
  ];
  return Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  );
};

export const createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

export const getProjects = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    status,
    featured,
    visible = true,
    sort = "-createdAt",
  } = req.query;

  const query = {};
  if (visible !== undefined) query.isVisible = visible === "true";
  if (category) query.category = category;
  if (status) query.status = status;
  if (featured) query.isFeatured = featured === "true";
  if (search) query.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Project.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Project.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: items,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getProjectBySlug = catchAsync(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug, isVisible: true });
  if (!project) throw new ApiError(404, "Project not found");

  // Increment views asynchronously (non-blocking)
  Project.updateOne({ _id: project._id }, { $inc: { "metrics.views": 1 } }).catch(
    () => {}
  );

  res.json({ success: true, data: project });
});

export const updateProject = catchAsync(async (req, res) => {
  const payload = pickProjectFields(req.body);

  const project = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, data: project });
});

export const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, message: "Project deleted" });
});
