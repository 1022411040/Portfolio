import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus, FiX, FiUpload } from "react-icons/fi";
import ApiClient from "../../Common/axios";
import SummaryApi from "../../common/SummaryApi";
import AdminLayout from "../../components/admin/AdminLayout";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    techStack: [],
    features: [],
    category: "web",
    status: "completed",
    images: [],
    links: {},
    liveUrl: "",
    githubUrl: "",
    isFeatured: false,
    isVisible: true,
    seo: {
      title: "",
      description: "",
    },
  });

  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const res = await ApiClient(SummaryApi.getProjectById(id));
      setForm(res.data.data);
    } catch (error) {
      console.error("Failed to load project:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await ApiClient({
        url: "/uploads/image",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setForm({
        ...form,
        images: [...form.images, res.data.data.url]
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index)
    });
  };

  const addTech = () => {
    if (techInput && !form.techStack.includes(techInput)) {
      setForm({
        ...form,
        techStack: [...form.techStack, techInput]
      });
      setTechInput("");
    }
  };

  const removeTech = (tech) => {
    setForm({
      ...form,
      techStack: form.techStack.filter(t => t !== tech)
    });
  };

  const addFeature = () => {
    if (featureInput) {
      setForm({
        ...form,
        features: [...form.features, featureInput]
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Auto-generate slug from title if not set
      if (!form.slug) {
        form.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }

      if (id) {
        await ApiClient({
          ...SummaryApi.updateProject(id),
          data: form,
        });
      } else {
        await ApiClient({ ...SummaryApi.createProject, data: form });
      }
      
      navigate("/admin/projects");
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">
          {id ? "Edit Project" : "Create New Project"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  required
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generated if empty"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Short Description</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                placeholder="Brief summary for cards"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Description</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[150px]"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="api">API</option>
                  <option value="desktop">Desktop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Images</h2>

            <div className="grid grid-cols-3 gap-4">
              {form.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt={`Project ${index}`} className="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              
              <label className="border-2 border-dashed border-white/10 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <FiUpload className="text-xl opacity-50" />
                <span className="text-xs mt-1 opacity-50">
                  {uploading ? "Uploading..." : "Upload"}
                </span>
              </label>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Tech Stack</h2>

            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                <FiPlus />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Features</h2>

            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add feature"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                <FiPlus />
              </button>
            </div>

            <ul className="list-disc pl-5 space-y-1">
              {form.features.map((feature, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiX size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Links</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Live URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Settings */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">Settings</h2>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                />
                <span className="text-sm">Featured on homepage</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
                />
                <span className="text-sm">Visible on site</span>
              </label>
            </div>
          </div>

          {/* SEO */}
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium">SEO</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={form.seo?.title || ""}
                onChange={(e) => setForm({
                  ...form,
                  seo: { ...form.seo, title: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={form.seo?.description || ""}
                onChange={(e) => setForm({
                  ...form,
                  seo: { ...form.seo, description: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : (id ? "Update Project" : "Create Project")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}