import { useState, useEffect } from "react";
import { 
  FiArrowRight, FiGithub, FiLinkedin, FiEdit2, 
  FiPlus, FiStar, FiEye, FiEyeOff 
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiClient from "../common/axios";
import SummaryApi from "../common/SummaryApi";
import PortfolioBootLoader from '../components/PortfolioBootLoader'
import PageLoader from "../components/ui/PageLoader";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((s) => s.admin);
  
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        ApiClient(SummaryApi.getProfile),
        ApiClient({ 
          ...SummaryApi.getProjects, 
          params: { 
            featured: true, 
            visible: true,
            limit: 3 
          } 
        }),
        ApiClient({ 
          ...SummaryApi.getSkills, 
          params: { visible: true } 
        }),
      ]);

      setProfile(profileRes.data.data || {});
      setFeaturedProjects(projectsRes.data.data || []);
      setSkills(skillsRes.data.data || []);
      console.log(skillsRes.data.data)
    } catch (error) {
      console.error("Failed to load home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProjectFeatured = async (projectId, currentFeatured) => {
    try {
      await ApiClient({
        url: `/projects/${projectId}/feature`,
        method: "PATCH",
        data: { isFeatured: !currentFeatured }
      });
      loadHomeData(); // Reload to reflect changes
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    }
  };

  const toggleSkillVisibility = async (skillId, currentVisible) => {
    try {
      await ApiClient({
        ...SummaryApi.updateSkill(skillId),
        data: { isVisible: !currentVisible }
      });
      loadHomeData();
    } catch (error) {
      console.error("Failed to toggle skill visibility:", error);
    }
  };

  const AdminEditButton = ({ type, item, onEdit, onToggle }) => {
    if (!isAuthenticated) return null;

    return (
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-lg"
          title={`Edit ${type}`}
        >
          <FiEdit2 size={14} />
        </button>
        {onToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`p-1.5 rounded-lg shadow-lg ${
              type === 'feature' 
                ? item?.isFeatured 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-400' 
                  : 'bg-gray-600 text-white hover:bg-gray-500'
                : item?.isVisible
                  ? 'bg-green-500 text-white hover:bg-green-400'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
            title={type === 'feature' 
              ? (item?.isFeatured ? 'Remove from featured' : 'Add to featured')
              : (item?.isVisible ? 'Hide from site' : 'Show on site')
            }
          >
            {type === 'feature' ? <FiStar size={14} /> : <FiEye size={14} />}
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <PageLoader />
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
      

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="relative group">
            {/* Admin Edit Profile Button */}
            {isAuthenticated && (
              <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => navigate("/admin/profile")}
                  className="inline-flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition"
                >
                  <FiEdit2 size={12} /> Edit Profile
                </button>
              </div>
            )}

            <span className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 px-4 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-6">
              {profile?.title || "Full-Stack Engineer • MERN"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white">
              {profile?.heroTitle || "Building production-ready web systems,"}
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                {profile?.heroSubtitle || "not just demos."}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              {profile?.bio || "I design and engineer scalable web applications with clean architecture, secure authentication, and performance-first thinking."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition"
              >
                View Projects
                <FiArrowRight />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-white/10 px-6 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                Contact Me
              </button>

              <div className="ml-2 flex items-center gap-3">
                <a
                  href={profile?.social?.github || "https://github.com/your-username"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <FiGithub />
                </a>
                <a
                  href={profile?.social?.linkedin || "https://linkedin.com/in/your-username"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Image & System Info */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 blur-2xl" />
              
             
              
              {isAuthenticated && (
                <button
                  onClick={() => navigate("/admin/profile")}
                  className="absolute bottom-2 right-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <FiEdit2 size={14} />
                </button>
              )}
            </div>

            {/* System Info Panel */}
            <div className="relative w-full max-w-md rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl p-6">
              <pre className="text-sm text-zinc-700 dark:text-zinc-300 font-mono overflow-x-auto">
{`// System Status
{
  "auth": "JWT + Refresh Tokens",
  "database": "MongoDB Atlas",
  "api": "REST API + Express",
  "storage": "Cloudinary",
  "deployment": "Vercel + Docker",
  "status": "production-ready"
}`}
              </pre>
              {isAuthenticated && (
                <button
                  onClick={() => navigate("/admin/seo")}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition opacity-0 group-hover:opacity-100"
                >
                  <FiEdit2 size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex items-end justify-between">
            <div className="relative group">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Featured Projects
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Real-world applications built with production architecture.
              </p>
              
              {isAuthenticated && (
                <div className="absolute -top-2 -right-16 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => navigate("/admin/projects")}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500"
                  >
                    Manage All
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => navigate("/projects")}
              className="hidden sm:inline-flex text-sm font-medium text-blue-600 hover:underline"
            >
              View all →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project._id}
                className="group relative rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 p-5 hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/projects/${project.slug}`)}
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <AdminEditButton 
                  type="project"
                  item={project}
                  onEdit={() => navigate(`/admin/projects/${project._id}/edit`)}
                  onToggle={() => toggleProjectFeatured(project._id, project.isFeatured)}
                />
                
                {project.images?.[0] ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-40 rounded-lg object-cover mb-4"
                  />
                ) : (
                  <div className="w-full h-40 rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 mb-4 flex items-center justify-center">
                    <span className="text-zinc-400 text-sm">No image</span>
                  </div>
                )}
                
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {project.shortDescription || project.description?.substring(0, 100)}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.techStack?.length || 0) > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick status indicators */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {project.status && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {featuredProjects.length === 0 && (
              <div className="col-span-3 text-center py-12 opacity-70">
                No featured projects yet
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills / Tech Stack Section */}
      <section className="py-20 px-4 border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="relative group">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Tech Stack
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Tools and technologies I use to build reliable systems.
              </p>
              
              {isAuthenticated && (
                <div className="absolute -top-2 -right-16 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => navigate("/admin/skills")}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500"
                  >
                    Manage Skills
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="relative group"
                onMouseEnter={() => setHoveredSkill(skill._id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 px-4 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900">
                  {skill.icon && (
                    <img src={skill.icon} alt="" className="w-4 h-4" />
                  )}
                  {skill.name}
                  {skill.proficiency && (
                    <span className="text-xs opacity-50 ml-1">
                      {skill.proficiency}%
                    </span>
                  )}
                </span>

                {isAuthenticated && hoveredSkill === skill._id && (
                  <div className="absolute -top-8 right-0 flex gap-1 bg-zinc-900 rounded-lg p-1 border border-white/10 shadow-lg">
                    <button
                      onClick={() => navigate("/admin/skills")}
                      className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                      title="Edit"
                    >
                      <FiEdit2 size={12} />
                    </button>
                    <button
                      onClick={() => toggleSkillVisibility(skill._id, skill.isVisible)}
                      className={`p-1 rounded ${
                        skill.isVisible 
                          ? 'bg-green-600 text-white hover:bg-green-500'
                          : 'bg-gray-600 text-white hover:bg-gray-500'
                      }`}
                      title={skill.isVisible ? 'Hide' : 'Show'}
                    >
                      {skill.isVisible ? <FiEye size={12} /> : <FiEyeOff size={12} />}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {skills.length === 0 && (
              <div className="text-center py-12 opacity-70 w-full">
                No skills added yet
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 border-t border-black/5 dark:border-white/10 bg-linear-to-r from-blue-600/5 to-cyan-600/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Ready to start a project?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Let's discuss how I can help bring your ideas to life with clean, scalable code.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-500 transition"
            >
              Get in Touch
              <FiArrowRight />
            </button>
            <a
              href={profile?.social?.github || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-white/10 px-8 py-4 text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              <FiGithub />
              View Code
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}