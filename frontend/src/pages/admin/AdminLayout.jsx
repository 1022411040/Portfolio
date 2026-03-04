// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { 
//   FiHome, FiGrid, FiCpu, FiMail, FiStar, FiUser, 
//   FiSettings, FiLogOut, FiMenu, FiX, FiUpload,
//   FiChevronRight, FiBell, FiSearch, FiChevronDown,
//   FiCode
// } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import ApiClient from "../../common/axios";
// import SummaryApi from "../../common/SummaryApi";
// import { clearAuth } from "../../store/slices/adminSlice";
// import clsx from "clsx";

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { admin } = useSelector((s) => s.admin);

//   const handleLogout = async () => {
//     try {
//       await ApiClient({
//         url: SummaryApi.adminLogout.url,
//         method: SummaryApi.adminLogout.method,
//         data: { refreshToken: localStorage.getItem("refreshToken") },
//       });
//     } catch (_) {}
//     dispatch(clearAuth());
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     navigate("/admin/login");
//   };

//   const navItems = [
//     { to: "/admin/dashboard", icon: FiHome, label: "Dashboard", exact: true },
//     { to: "/admin/projects", icon: FiGrid, label: "Projects" },
//     { to: "/admin/skills", icon: FiCpu, label: "Skills" },
//     { to: "/admin/testimonials", icon: FiStar, label: "Testimonials" },
//     { to: "/admin/contacts", icon: FiMail, label: "Contacts" },
//     { to: "/admin/profile", icon: FiUser, label: "Profile" },
//     { to: "/admin/seo", icon: FiSettings, label: "SEO" },
//     { to: "/admin/uploads", icon: FiUpload, label: "Uploads" },
//   ];

//   return (
//     <div className="min-h-screen bg-neutral-950">
//       {/* Mobile Header */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 z-20">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
//           aria-label="Open menu"
//         >
//           <FiMenu className="text-xl text-neutral-400" />
//         </button>
//         <span className="font-semibold text-neutral-200">Admin Panel</span>
//         <div className="w-10 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
//           <span className="text-sm font-medium text-neutral-300">
//             {admin?.name?.charAt(0) || 'A'}
//           </span>
//         </div>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/80 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={clsx(
//         "fixed top-20 left-0 bottom-0 w-64 bg-neutral-900 border-r border-neutral-800 z-9 transition-transform duration-300 lg:translate-x-0 shadow-2xl lg:shadow-none",
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       )}>
//         {/* Logo */}
//         <div className="h-16 flex items-center px-4 border-b border-neutral-800">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <FiCode className="text-white text-lg" />
//             </div>
//             <span className="text-lg font-semibold text-neutral-200">Vikas.dev</span>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden ml-auto p-2 rounded-lg hover:bg-neutral-800 transition-colors"
//             aria-label="Close menu"
//           >
//             <FiX className="text-neutral-400" />
//           </button>
//         </div>

//         {/* Admin Profile Card */}
//         <div className="p-4 border-b border-neutral-800">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center ring-2 ring-neutral-700">
//               <span className="text-sm font-medium text-neutral-300">
//                 {admin?.name?.charAt(0) || 'A'}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-neutral-200 truncate">{admin?.name}</p>
//               <p className="text-xs text-neutral-500 truncate">{admin?.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="p-4">
//           <nav className="space-y-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end={item.exact}
//                 onClick={() => setSidebarOpen(false)}
//                 className={({ isActive }) => clsx(
//                   "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
//                   isActive 
//                     ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
//                     : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
//                 )}
//               >
//                 {({ isActive }) => (
//                   <>
//                     <item.icon className={clsx(
//                       "text-lg",
//                       isActive ? "text-blue-400" : "text-neutral-500"
//                     )} />
//                     <span className="flex-1">{item.label}</span>
//                     {isActive && <FiChevronRight className="text-sm text-blue-400" />}
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         {/* Logout Button */}
//         <div className="absolute bottom-4 left-4 right-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
//           >
//             <FiLogOut className="text-lg text-red-500/70" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="lg:ml-64 min-h-screen bg-neutral-950">

//         {/* Page Content */}
//         <div className="p-6">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FiHome, FiGrid, FiCpu, FiMail, FiStar, FiUser, 
  FiSettings, FiLogOut, FiMenu, FiX, FiUpload,
  FiChevronRight, FiBell, FiSearch, FiChevronDown,
  FiCode, FiChevronLeft, FiFolder, FiMessageCircle,
  FiAward, FiTool, FiLayout, FiShield
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ApiClient from "../../Common/axios";
import SummaryApi from "../../common/SummaryApi";
import { clearAuth } from "../../store/slices/adminSlice";
import clsx from "clsx";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((s) => s.admin);

  const handleLogout = async () => {
    try {
      await ApiClient({
        url: SummaryApi.adminLogout.url,
        method: SummaryApi.adminLogout.method,
        data: { refreshToken: localStorage.getItem("refreshToken") },
      });
    } catch (_) {}
    dispatch(clearAuth());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin/dashboard", icon: FiHome, label: "Dashboard", exact: true },
    { to: "/admin/projects", icon: FiGrid, label: "Projects", badge: 3 },
    { to: "/admin/skills", icon: FiCpu, label: "Skills" },
    { to: "/admin/testimonials", icon: FiStar, label: "Testimonials", badge: 2 },
    { to: "/admin/contacts", icon: FiMail, label: "Contacts", badge: 5 },
    { to: "/admin/profile", icon: FiUser, label: "Profile" },
    { to: "/admin/seo", icon: FiSettings, label: "SEO" },
    { to: "/admin/uploads", icon: FiUpload, label: "Uploads" },
  ];

  const bottomNavItems = [
    { to: "/admin/settings", icon: FiSettings, label: "Settings" },
    { to: "/admin/help", icon: FiMessageCircle, label: "Help" },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="text-xl text-neutral-400" />
        </button>
        <span className="font-semibold text-neutral-200">Admin Panel</span>
        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
          <span className="text-sm font-medium text-neutral-300">
            {admin?.name?.charAt(0) || 'A'}
          </span>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-0 left-0 bottom-0 bg-neutral-900 border-r border-neutral-800 z-50 transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section with Toggle */}
        <div className={clsx(
          "h-16 flex items-center border-b border-neutral-800",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}>
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FiCode className="text-white text-lg" />
                </div>
                <span className="text-lg font-semibold text-neutral-200">Vikas.dev</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-200"
                aria-label="Collapse sidebar"
              >
                <FiChevronLeft size={18} />
              </button>
            </>
          ) : (
            <>
              
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-200"
                aria-label="Expand sidebar"
              >
                <FiChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Admin Profile Card */}
        <div className={clsx(
          "p-4 border-b border-neutral-800",
          collapsed && "flex justify-center"
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-sm font-medium text-white">
                  {admin?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-200 truncate">{admin?.name || 'Admin User'}</p>
                <p className="text-xs text-neutral-500 truncate">{admin?.email || 'admin@example.com'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-neutral-500">Online</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-sm font-medium text-white">
                  {admin?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-neutral-900"></span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-3 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Main Navigation */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => clsx(
                  "flex items-center rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={clsx(
                      "text-lg flex-shrink-0",
                      collapsed ? "mr-0" : "mr-3",
                      isActive ? "text-blue-400" : "text-neutral-500 group-hover:text-neutral-400"
                    )} />
                    
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                            {item.badge}
                          </span>
                        )}
                        {isActive && <FiChevronRight className="text-sm text-blue-400 ml-1" />}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-neutral-700 z-50">
                        {item.label}
                        {item.badge && (
                          <span className="ml-1 px-1 bg-red-500/20 text-red-400 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-neutral-800" />

          {/* Bottom Navigation */}
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => clsx(
                  "flex items-center rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5",
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                )}
              >
                <item.icon className={clsx(
                  "text-lg flex-shrink-0",
                  collapsed ? "mr-0" : "mr-3",
                )} />
                {!collapsed && <span className="flex-1">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-neutral-700">
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className={clsx(
          "absolute bottom-4",
          collapsed ? "left-0 right-0 px-3" : "left-4 right-4"
        )}>
          <button
            onClick={handleLogout}
            className={clsx(
              "flex items-center w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 group relative",
              collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"
            )}
          >
            <FiLogOut className={clsx(
              "text-lg text-red-500/70 flex-shrink-0",
              collapsed ? "mr-0" : "mr-3"
            )} />
            {!collapsed && <span>Logout</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-neutral-700">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={clsx(
        "min-h-screen bg-neutral-950 transition-all duration-300 pt-16 lg:pt-0",
        collapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}