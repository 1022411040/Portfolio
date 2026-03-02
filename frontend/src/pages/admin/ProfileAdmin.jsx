import { useEffect, useState } from "react";
import ApiClient from "../../common/axios";
import SummaryApi from "../../common/SummaryApi";
import AdminLayout from "../admin/AdminLayout";

export default function ProfileAdmin() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    avatar: "",
    social: {
      github: "",
      linkedin: "",
      twitter: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await ApiClient(SummaryApi.getProfile);
      if (res.data.data) {
        setForm(res.data.data);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
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
      
      setForm({ ...form, avatar: res.data.data.url });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      await ApiClient({ ...SummaryApi.updateProfile, data: form });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-6 space-y-6">
          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <div className="flex items-center gap-4">
              {form.avatar ? (
                <img src={form.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-2xl">{form.name?.charAt(0) || "?"}</span>
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="inline-block px-4 py-2 bg-zinc-800 rounded-lg text-sm cursor-pointer hover:bg-zinc-700 transition"
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </label>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="Your name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="e.g., Full Stack Developer"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="email@example.com"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[120px]"
                placeholder="Write a short bio..."
                value={form.bio || ""}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-medium">Social Links</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="https://github.com/username"
                value={form.social?.github || ""}
                onChange={(e) => setForm({
                  ...form,
                  social: { ...form.social, github: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="https://linkedin.com/in/username"
                value={form.social?.linkedin || ""}
                onChange={(e) => setForm({
                  ...form,
                  social: { ...form.social, linkedin: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Twitter</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="https://twitter.com/username"
                value={form.social?.twitter || ""}
                onChange={(e) => setForm({
                  ...form,
                  social: { ...form.social, twitter: e.target.value }
                })}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={saveProfile}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}