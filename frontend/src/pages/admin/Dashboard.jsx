import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiActivity, FiTrendingUp, FiUsers, FiMessageSquare, 
  FiPlus, FiUpload, FiExternalLink, FiMail, FiCheckCircle,
  FiClock, FiStar, FiEye, FiArrowRight, FiCalendar
} from "react-icons/fi";
import { 
  MdOutlineDashboard, 
  MdOutlineComputer 
} from "react-icons/md";
import ApiClient from "../../Common/axios";
import SummaryApi from "../../common/SummaryApi";
import AdminLayout from "../admin/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    contacts: 0,
    testimonials: 0,
    pendingContacts: 0,
    pendingTestimonials: 0,
    featuredProjects: 0,
    totalViews: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [projects, skills, contacts, testimonials] = await Promise.all([
          ApiClient({ ...SummaryApi.getProjects, params: { limit: 3 } }),
          ApiClient(SummaryApi.getSkills),
          ApiClient({ url: "/contacts", method: "GET", params: { limit: 5 } }),
          ApiClient({ url: "/testimonials/admin", method: "GET", params: { limit: 5 } }),
        ]);

        const projectsData = projects.data.data || [];
        const featuredCount = projectsData.filter(p => p.isFeatured).length;
        const totalViews = projectsData.reduce((acc, p) => acc + (p.metrics?.views || 0), 0);

        setStats({
          projects: projects.data.meta?.total || projectsData.length,
          skills: skills.data.data.length,
          contacts: contacts.data.meta?.total || contacts.data.data.length,
          testimonials: testimonials.data.data.length,
          pendingContacts: contacts.data.data.filter(c => c.status === "new").length,
          pendingTestimonials: testimonials.data.data.filter(t => !t.isApproved).length,
          featuredProjects: featuredCount,
          totalViews: totalViews,
        });

        setRecentContacts(contacts.data.data.slice(0, 5));
        setRecentProjects(projectsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-gray-400 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="p-6 lg:p-8 space-y-8">
          {/* Header with gradient */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"></div>
            <div className="relative flex items-center justify-between p-6">
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome back, Admin
                </h1>
                <p className="text-gray-400 mt-1 flex items-center gap-2">
                  <FiCalendar className="text-indigo-400" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <span className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/10">
                  <span className="text-indigo-400 font-semibold">{stats.projects}</span> Total Projects
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid with improved design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
              title="Total Projects" 
              value={stats.projects} 
              icon={MdOutlineComputer}
              gradient="from-blue-500 to-cyan-500"
              secondaryValue={`${stats.featuredProjects} featured`}
              secondaryIcon={FiStar}
            />
            <StatCard 
              title="Skills" 
              value={stats.skills} 
              icon={FiTrendingUp}
              gradient="from-emerald-500 to-teal-500"
              badge={stats.skills > 0 ? "Active" : null}
            />
            <StatCard 
              title="Contacts" 
              value={stats.contacts} 
              icon={FiMessageSquare}
              gradient="from-purple-500 to-pink-500"
              badge={stats.pendingContacts}
              badgeText="new"
            />
            <StatCard 
              title="Testimonials" 
              value={stats.testimonials} 
              icon={FiUsers}
              gradient="from-orange-500 to-red-500"
              badge={stats.pendingTestimonials}
              badgeText="pending"
            />
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SecondaryStatCard 
              label="Total Views"
              value={stats.totalViews.toLocaleString()}
              icon={FiEye}
              change="+12%"
            />
            <SecondaryStatCard 
              label="Response Rate"
              value="94%"
              icon={FiCheckCircle}
              change="+5%"
            />
            <SecondaryStatCard 
              label="Avg. Response"
              value="2.4h"
              icon={FiClock}
              change="-30m"
            />
            <SecondaryStatCard 
              label="Projects/Views"
              value={stats.projects > 0 ? Math.round(stats.totalViews / stats.projects) : 0}
              icon={FiActivity}
              subtext="per project"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Contacts with improved design */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FiMail className="text-indigo-400" />
                  Recent Contacts
                  {stats.pendingContacts > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                      {stats.pendingContacts} new
                    </span>
                  )}
                </h2>
                <Link 
                  to="/admin/contacts" 
                  className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  View all <FiArrowRight />
                </Link>
              </div>
              <div className="space-y-3">
                {recentContacts.length > 0 ? (
                  recentContacts.map((contact, idx) => (
                    <div 
                      key={contact._id} 
                      className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-white">{contact.name}</p>
                            <StatusBadge status={contact.status} />
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-1">{contact.subject || "No subject"}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(contact.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <FiMail className="text-indigo-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiMail className="mx-auto text-3xl mb-2 opacity-50" />
                    <p>No recent contacts</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FiActivity className="text-indigo-400" />
                  Recent Projects
                </h2>
                <Link 
                  to="/admin/projects" 
                  className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  View all <FiArrowRight />
                </Link>
              </div>
              <div className="space-y-3">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <div 
                      key={project._id} 
                      className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-white">{project.title}</p>
                            {project.isFeatured && (
                              <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-1">{project.shortDescription}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <FiEye className="text-indigo-400" size={12} />
                              {project.metrics?.views || 0} views
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiActivity className="mx-auto text-3xl mb-2 opacity-50" />
                    <p>No projects yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard 
              to="/admin/projects/new" 
              label="New Project" 
              icon={FiPlus}
              gradient="from-indigo-500 to-indigo-600"
            />
            <QuickActionCard 
              to="/admin/skills/new" 
              label="New Skill" 
              icon={FiTrendingUp}
              gradient="from-emerald-500 to-emerald-600"
            />
            <QuickActionCard 
              to="/admin/uploads" 
              label="Upload Images" 
              icon={FiUpload}
              gradient="from-purple-500 to-purple-600"
            />
            <QuickActionCard 
              to="/" 
              label="Live Site" 
              icon={FiExternalLink}
              gradient="from-orange-500 to-orange-600"
              external
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Enhanced Stat Card with gradients
function StatCard({ title, value, icon: Icon, gradient, badge, badgeText, secondaryValue, secondaryIcon: SecondaryIcon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="text-white text-xl" />
          </div>
          {badge > 0 && (
            <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
              {badge} {badgeText}
            </span>
          )}
        </div>
        
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        
        {secondaryValue && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            {SecondaryIcon && <SecondaryIcon size={12} className="text-indigo-400" />}
            <span>{secondaryValue}</span>
          </div>
        )}
      </div>
      
      {/* Decorative gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </div>
  );
}

// Secondary stat card for additional metrics
function SecondaryStatCard({ label, value, icon: Icon, change, subtext }) {
  const isPositive = change?.startsWith('+');
  
  return (
    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <Icon className="text-gray-400 text-lg" />
        {change && (
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-xl font-semibold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">
        {label}
        {subtext && <span className="ml-1 text-gray-600">({subtext})</span>}
      </p>
    </div>
  );
}

// Status badge component
function StatusBadge({ status }) {
  const config = {
    new: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'New' },
    read: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Read' },
    responded: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'Responded' },
    archived: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Archived' }
  };
  
  const statusConfig = config[status] || config.new;
  
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full border ${statusConfig.color}`}>
      {statusConfig.label}
    </span>
  );
}

// Enhanced Quick Action Card
function QuickActionCard({ to, label, icon: Icon, gradient, external }) {
  const Comp = external ? 'a' : Link;
  const props = external ? { href: to, target: "_blank", rel: "noopener noreferrer" } : { to };
  
  return (
    <Comp
      {...props}
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 p-4"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="relative flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="text-white text-lg" />
        </div>
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
    </Comp>
  );
}