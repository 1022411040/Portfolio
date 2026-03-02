import { useEffect, useState } from "react";
import { FiCheck, FiX, FiEye, FiEyeOff, FiStar } from "react-icons/fi";
import ApiClient from "../../common/axios";
import AdminLayout from "../admin/AdminLayout";
import clsx from "clsx";

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadTestimonials = async () => {
    try {
      const res = await ApiClient({ url: "/testimonials/admin", method: "GET" });
      setItems(res.data.data);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const moderate = async (id, updates) => {
    try {
      await ApiClient({
        url: `/testimonials/${id}/moderate`,
        method: "PUT",
        data: updates,
      });
      loadTestimonials();
    } catch (error) {
      console.error("Failed to moderate testimonial:", error);
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      await ApiClient({ url: `/testimonials/${id}`, method: "DELETE" });
      loadTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === "pending") return !item.isApproved;
    if (filter === "approved") return item.isApproved;
    return true;
  });

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
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm transition",
                filter === "all" ? "bg-blue-600 text-white" : "bg-zinc-800 hover:bg-zinc-700"
              )}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm transition",
                filter === "pending" ? "bg-yellow-600 text-white" : "bg-zinc-800 hover:bg-zinc-700"
              )}
            >
              Pending ({items.filter(i => !i.isApproved).length})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm transition",
                filter === "approved" ? "bg-green-600 text-white" : "bg-zinc-800 hover:bg-zinc-700"
              )}
            >
              Approved ({items.filter(i => i.isApproved).length})
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredItems.map((testimonial) => (
            <div
              key={testimonial._id}
              className={clsx(
                "border border-white/10 rounded-xl p-4",
                testimonial.isApproved ? "bg-zinc-900" : "bg-yellow-500/5"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{testimonial.name}</h3>
                    {!testimonial.isApproved && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-70 mb-2">{testimonial.message}</p>
                  
                  {testimonial.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < testimonial.rating ? "text-yellow-400" : "text-gray-400"}
                        />
                      ))}
                    </div>
                  )}

                  <div className="text-xs opacity-50">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!testimonial.isApproved && (
                    <button
                      onClick={() => moderate(testimonial._id, { isApproved: true })}
                      className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
                      title="Approve"
                    >
                      <FiCheck />
                    </button>
                  )}
                  
                  <button
                    onClick={() => moderate(testimonial._id, { isVisible: !testimonial.isVisible })}
                    className={clsx(
                      "p-2 rounded-lg transition",
                      testimonial.isVisible 
                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    )}
                    title={testimonial.isVisible ? "Hide" : "Show"}
                  >
                    {testimonial.isVisible ? <FiEye /> : <FiEyeOff />}
                  </button>

                  <button
                    onClick={() => deleteTestimonial(testimonial._id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    title="Delete"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 opacity-70">
              No testimonials found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}