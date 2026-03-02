export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
  // ===== AUTH (ADMIN) =====
  adminRegister: {
    url: "/admin/auth/register",
    method: "POST",
  },
  adminLogin: {
    url: "/admin/auth/login",
    method: "POST",
  },
  adminRefresh: {
    url: "/admin/auth/refresh",
    method: "POST",
  },
  adminLogout: {
    url: "/admin/auth/logout",
    method: "POST",
  },
  adminMe: {
    url: "/admin/auth/me",
    method: "GET",
  },

  // ===== PROJECTS =====
  createProject: {
    url: "/projects",
    method: "POST",
  },
  getProjects: {
    url: "/projects",
    method: "GET",
  },
  getProjectBySlug: (slug) => ({
    url: `/projects/slug/${slug}`,
    method: "GET",
  }),
  updateProject: (id) => ({
    url: `/projects/${id}`,
    method: "PUT",
  }),
  deleteProject: (id) => ({
    url: `/projects/${id}`,
    method: "DELETE",
  }),
  featureProject: (id) => ({
    url: `/projects/${id}/feature`,
    method: "PATCH",
  }),

  // ===== SKILLS =====
  createSkill: {
    url: "/skills",
    method: "POST",
  },
  getSkills: {
    url: "/skills",
    method: "GET",
  },
  updateSkill: (id) => ({
    url: `/skills/${id}`,
    method: "PUT",
  }),
  deleteSkill: (id) => ({
    url: `/skills/${id}`,
    method: "DELETE",
  }),
  reorderSkills: {
    url: "/skills/reorder/bulk",
    method: "PUT",
  },

  // ===== PROFILE / ABOUT =====
  getProfile: {
    url: "/profile",
    method: "GET",
  },
  updateProfile: {
    url: "/profile",
    method: "PUT",
  },

  // ===== CONTACT =====
  submitContact: {
    url: "/contacts",
    method: "POST",
  },
  getContacts: {
    url: "/contacts",
    method: "GET",
  },
  getContactById: (id) => ({
    url: `/contacts/${id}`,
    method: "GET",
  }),
  updateContactStatus: (id) => ({
    url: `/contacts/${id}/status`,
    method: "PATCH",
  }),
  deleteContact: (id) => ({
    url: `/contacts/${id}`,
    method: "DELETE",
  }),

  // ===== TESTIMONIALS =====
  submitTestimonial: {
    url: "/testimonials",
    method: "POST",
  },
  getTestimonials: {
    url: "/testimonials",
    method: "GET",
  },
  approveTestimonial: (id) => ({
    url: `/testimonials/${id}/approve`,
    method: "PATCH",
  }),
  updateTestimonial: (id) => ({
    url: `/testimonials/${id}`,
    method: "PUT",
  }),
  deleteTestimonial: (id) => ({
    url: `/testimonials/${id}`,
    method: "DELETE",
  }),

  // ===== SEO =====
  getSeo: {
    url: "/seo",
    method: "GET",
  },
  updateSeo: {
    url: "/seo",
    method: "PUT",
  },

  // ===== UPLOADS (CLOUDINARY) =====
  uploadImage: {
    url: "/uploads/image",
    method: "POST",
  },
};

export default SummaryApi;
