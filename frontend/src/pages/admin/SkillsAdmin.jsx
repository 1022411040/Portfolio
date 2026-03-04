import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiEyeOff, FiMove } from "react-icons/fi";
import ApiClient from "../../Common/axios";
import SummaryApi from "../../common/SummaryApi";
import AdminLayout from "../admin/AdminLayout";
import clsx from "clsx";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
 const categories = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

const [form, setForm] = useState({
  name: "",
  category: "Frontend",
  proficiency: 80,
  icon: "",
  isVisible: true,
});

  const loadSkills = async () => {
    try {
      const res = await ApiClient(SummaryApi.getSkills);
      setSkills(res.data.data);
      console.log(res)
    } catch (error) {
      console.error("Failed to load skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await ApiClient({
          ...SummaryApi.updateSkill(editingSkill._id),
          data: form,
        });
      } else {
        await ApiClient({ ...SummaryApi.createSkill, data: form });
      }
      
      loadSkills();
      resetForm();
    } catch (error) {
      console.error("Failed to save skill:", error);
    }
  };

  const resetForm = () => {
    setForm({ name: "", category: "frontend", proficiency: 80, icon: "", isVisible: true });
    setEditingSkill(null);
    setShowForm(false);
  };

  const editSkill = (skill) => {
    setEditingSkill(skill);
    setForm(skill);
    setShowForm(true);
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    
    try {
      await ApiClient(SummaryApi.deleteSkill(id));
      loadSkills();
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  const toggleVisibility = async (skill) => {
    try {
      await ApiClient({
        ...SummaryApi.updateSkill(skill._id),
        data: { isVisible: !skill.isVisible },
      });
      loadSkills();
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
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
          <h1 className="text-2xl font-semibold">Skills</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            <FiPlus /> Add Skill
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="border border-white/10 bg-zinc-900 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Proficiency ({form.proficiency}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                  value={form.proficiency}
                  onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Icon URL (optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="https://cdn.jsdelivr.net/..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={form.isVisible}
                  onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
                />
                <label htmlFor="isVisible" className="text-sm">Visible on site</label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  {editingSkill ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills List */}
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="border border-white/10 bg-zinc-900 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <FiMove className="text-gray-400 cursor-move" />
                <div>
                  <h3 className="font-medium">{skill.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                      {skill.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {skill.proficiency}% proficiency
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVisibility(skill)}
                  className={clsx(
                    "p-1.5 rounded-lg transition",
                    skill.isVisible 
                      ? "text-green-400 hover:text-green-300" 
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  {skill.isVisible ? <FiEye /> : <FiEyeOff />}
                </button>
                <button
                  onClick={() => editSkill(skill)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-blue-400"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => deleteSkill(skill._id)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-red-400"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}