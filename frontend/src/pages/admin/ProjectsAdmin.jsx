import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiStar, FiEye, FiEyeOff, FiPlus } from "react-icons/fi";
import ApiClient from "../../Common/axios";
import SummaryApi from "../../Common/SummaryApi";
import AdminLayout from "../admin/AdminLayout";
import clsx from "clsx";

export default function ProjectsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    featured: "",
  });

  const loadProjects = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.category) params.category = filters.category;
      if (filters.featured) params.featured = filters.featured === "true";

      const res = await ApiClient({
        ...SummaryApi.getProjects,
        params
      });
      setItems(res.data.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [filters]);

  const toggleFeatured = async (id, current) => {
    try {
      await ApiClient({
        url: `/projects/${id}/feature`,
        method: "PATCH",
        data: { isFeatured: !current }
      });
      loadProjects();
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    }
  };

  const toggleVisibility = async (id, current) => {
    try {
      await ApiClient({
        ...SummaryApi.updateProject(id),
        data: { isVisible: !current }
      });
      loadProjects();
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await ApiClient(SummaryApi.deleteProject(id));
      loadProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            <FiPlus /> New Project
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 rounded-lg border border-white/10 bg-zinc-900 text-sm"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 rounded-lg border border-white/10 bg-zinc-900 text-sm"
          >
            <option value="">All Categories</option>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="api">API</option>
          </select>

          <select
            value={filters.featured}
            onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
            className="px-3 py-2 rounded-lg border border-white/10 bg-zinc-900 text-sm"
          >
            <option value="">All Projects</option>
            <option value="true">Featured Only</option>
            <option value="false">Non-Featured</option>
          </select>
        </div>

        {/* Projects Table */}
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr>
                <th className="text-left p-4 text-sm font-medium">Title</th>
                <th className="text-left p-4 text-sm font-medium">Category</th>
                <th className="text-left p-4 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-sm font-medium">Featured</th>
                <th className="text-left p-4 text-sm font-medium">Visible</th>
                <th className="text-left p-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((project) => (
                <tr key={project._id} className="border-t border-white/10 hover:bg-zinc-900/50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs opacity-70">{project.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{project.category}</td>
                  <td className="p-4">
                    <span className={clsx(
                      "text-xs px-2 py-1 rounded-full",
                      project.status === "completed" && "bg-green-500/20 text-green-400",
                      project.status === "in-progress" && "bg-blue-500/20 text-blue-400",
                      project.status === "planned" && "bg-yellow-500/20 text-yellow-400"
                    )}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(project._id, project.isFeatured)}
                      className={clsx(
                        "p-1.5 rounded-lg transition",
                        project.isFeatured 
                          ? "text-yellow-400 hover:text-yellow-300" 
                          : "text-gray-400 hover:text-gray-300"
                      )}
                    >
                      <FiStar />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleVisibility(project._id, project.isVisible)}
                      className={clsx(
                        "p-1.5 rounded-lg transition",
                        project.isVisible 
                          ? "text-green-400 hover:text-green-300" 
                          : "text-gray-400 hover:text-gray-300"
                      )}
                    >
                      {project.isVisible ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/projects/${project._id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-blue-400"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-red-400"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}