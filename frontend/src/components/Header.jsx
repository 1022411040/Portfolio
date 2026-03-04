// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   FiMenu,
//   FiX,
//   FiGithub,
//   FiLinkedin,
//   FiMail,
//   FiMoon,
//   FiSun,
//   FiSearch,
//   FiLogOut,
//   FiUser,
//   FiGrid,
//   FiChevronDown,
//   FiSettings,
//   FiCode,
//   FiHome,
//   FiBriefcase,
//   FiCpu,
//   FiMessageCircle,
//   FiExternalLink,
//   FiClock,
//   FiStar,
//   FiTrendingUp,
// } from "react-icons/fi";
// import { 
//   SiGithub, 
//   SiLinkedin, 
//   SiGmail,
// } from "react-icons/si";
// import { useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
// import clsx from "clsx";
// import { useTheme } from "../context/ThemeProvider";
// import { useDispatch, useSelector } from "react-redux";
// import ApiClient from "../common/axios";
// import SummaryApi from "../common/SummaryApi";
// import { clearAuth } from "../store/slices/adminSlice";
// import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// // ==================== CONSTANTS ====================
// const NAV_ITEMS = [
//   { label: "Home", to: "/", icon: FiHome, description: "Go back home" },
//   { label: "Projects", to: "/projects", icon: FiBriefcase, description: "View my work" },
//   { label: "Skills", to: "/skills", icon: FiCpu, description: "Technologies I use" },
//   { label: "Contact", to: "/contact", icon: FiMessageCircle, description: "Get in touch" },
// ];

// const SOCIAL_LINKS = [
//   { icon: SiGithub, href: "https://github.com/vikas", label: "GitHub", color: "hover:text-[#333] dark:hover:text-[#fff]" },
//   { icon: SiLinkedin, href: "https://linkedin.com/in/vikas", label: "LinkedIn", color: "hover:text-[#0077B5]" },
//   { icon: SiGmail, href: "mailto:hello@vikas.dev", label: "Email", color: "hover:text-[#EA4335]" },
// ];

// const QUICK_ACTIONS = [
//   { icon: FiClock, label: "Recent Projects", href: "/projects?sort=recent" },
//   { icon: FiStar, label: "Featured Work", href: "/projects?featured=true" },
//   { icon: FiTrendingUp, label: "Popular Skills", href: "/skills?trending=true" },
// ];

// // ==================== CUSTOM HOOKS ====================
// const useClickOutside = (ref, handler) => {
//   useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || ref.current.contains(event.target)) return;
//       handler(event);
//     };
//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);
//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// };

// const useScrollDirection = () => {
//   const [scrollDirection, setScrollDirection] = useState("up");
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     const updateScrollDirection = () => {
//       const currentScrollY = window.scrollY;
//       const direction = currentScrollY > lastScrollY ? "down" : "up";
//       if (direction !== scrollDirection && Math.abs(currentScrollY - lastScrollY) > 10) {
//         setScrollDirection(direction);
//       }
//       setScrollY(currentScrollY);
//       lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
//     };
//     window.addEventListener("scroll", updateScrollDirection);
//     return () => window.removeEventListener("scroll", updateScrollDirection);
//   }, [scrollDirection]);

//   return { scrollDirection, scrollY };
// };

// // ==================== LIQUID HOVER COMPONENT ====================
// const LiquidHover = memo(({ children, className = "", onClick }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const ref = useRef(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
  
//   const springConfig = { damping: 25, stiffness: 300 };
//   const springX = useSpring(mouseX, springConfig);
//   const springY = useSpring(mouseY, springConfig);
  
//   const handleMouseMove = (e) => {
//     const rect = ref.current?.getBoundingClientRect();
//     if (rect) {
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       mouseX.set(x);
//       mouseY.set(y);
//     }
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className={clsx("relative overflow-hidden", className)}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       onMouseMove={handleMouseMove}
//       onClick={onClick}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//     >
//       {/* Liquid background effect */}
//       <motion.div
//         className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-lg pointer-events-none"
//         style={{
//           opacity: isHovered ? 1 : 0,
//           WebkitMaskImage: useTransform(
//             [springX, springY],
//             ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, black 0%, transparent 70%)`
//           ),
//         }}
//         transition={{ duration: 0.3 }}
//       />
      
//       {children}
//     </motion.div>
//   );
// });

// LiquidHover.displayName = "LiquidHover";

// // ==================== LOGO COMPONENT ====================
// const Logo = memo(({ onClick }) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   return (
//     <LiquidHover onClick={onClick} className="px-3 py-2">
//       <motion.div 
//         className="relative flex items-center gap-2"
//         onHoverStart={() => setIsHovered(true)}
//         onHoverEnd={() => setIsHovered(false)}
//       >
//         {/* Animated icon */}
//         <div className="relative">
//           <motion.div
//             className="w-8 h-8 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
//             animate={{
//               rotate: isHovered ? [0, 10, -10, 0] : 0,
//               scale: isHovered ? [1, 1.2, 1] : 1,
//             }}
//             transition={{ duration: 0.5 }}
//           >
//             <FiCode className="text-white text-lg" />
//           </motion.div>
//         </div>

//         {/* Text with gradient */}
//         <div className="flex items-baseline">
//           <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
//             Vikas
//           </span>
//           <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             .dev
//           </span>
//         </div>

//         {/* Animated underline */}
//         <motion.div
//           className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
//           initial={{ scaleX: 0, opacity: 0 }}
//           animate={{ 
//             scaleX: isHovered ? 1 : 0,
//             opacity: isHovered ? 1 : 0
//           }}
//           transition={{ duration: 0.3 }}
//         />
//       </motion.div>
//     </LiquidHover>
//   );
// });

// Logo.displayName = "Logo";

// // ==================== SEARCH BAR COMPONENT ====================
// const SearchBar = memo(({ onSearch, isExpanded, onFocus, onBlur, isMobile = false }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   useClickOutside(suggestionsRef, () => setShowSuggestions(false));

//   const handleChange = useCallback((e) => {
//     const value = e.target.value;
//     setQuery(value);
    
//     if (value.length > 2) {
//       // Mock suggestions - replace with actual API
//       setSuggestions([
//         { type: "project", name: "E-commerce Platform", category: "React" },
//         { type: "skill", name: "TypeScript", category: "Language" },
//         { type: "project", name: "AI Dashboard", category: "Python" },
//       ]);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   }, []);

//   const handleSubmit = useCallback((e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       onSearch(query);
//       setQuery("");
//       setShowSuggestions(false);
//     }
//   }, [query, onSearch]);

//   const handleSuggestionClick = useCallback((suggestion) => {
//     onSearch(suggestion.name);
//     setQuery("");
//     setShowSuggestions(false);
//   }, [onSearch]);

//   return (
//     <div className="relative" ref={suggestionsRef}>
//       <form onSubmit={handleSubmit}>
//         <motion.div
//           className={clsx(
//             "relative transition-all duration-300",
//             isMobile ? "w-full" : (isExpanded ? "w-80" : "w-64")
//           )}
//           animate={{
//             scale: isExpanded && !isMobile ? 1.05 : 1,
//           }}
//         >
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
//           <input
//             ref={inputRef}
//             type="text"
//             value={query}
//             onChange={handleChange}
//             onFocus={() => {
//               onFocus?.();
//               if (suggestions.length > 0) setShowSuggestions(true);
//             }}
//             onBlur={onBlur}
//             placeholder={isMobile ? "Search..." : "Search projects, skills..."}
//             className={clsx(
//               "w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500",
//               isMobile ? "pl-10 pr-4 py-3" : "pl-10 pr-12 py-2.5"
//             )}
//           />
          
//           {/* Keyboard shortcut - only desktop */}
//           {!isMobile && (
//             <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
//               ⌘K
//             </kbd>
//           )}
//         </motion.div>
//       </form>

//       {/* Search suggestions */}
//       <AnimatePresence>
//         {showSuggestions && suggestions.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className={clsx(
//               "absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden",
//               isMobile ? "max-h-96" : ""
//             )}
//           >
//             {suggestions.map((suggestion, idx) => (
//               <LiquidHover key={idx}>
//                 <button
//                   className="w-full px-4 py-3 flex items-center gap-3 text-left"
//                   onClick={() => handleSuggestionClick(suggestion)}
//                 >
//                   {suggestion.type === "project" ? (
//                     <FiBriefcase className="text-indigo-500" />
//                   ) : (
//                     <FiCode className="text-green-500" />
//                   )}
//                   <div>
//                     <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                       {suggestion.name}
//                     </p>
//                     <p className="text-xs text-neutral-500">{suggestion.category}</p>
//                   </div>
//                 </button>
//               </LiquidHover>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });

// SearchBar.displayName = "SearchBar";

// // ==================== PROFILE DROPDOWN ====================
// const ProfileDropdown = memo(({ admin, onLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useClickOutside(dropdownRef, () => setIsOpen(false));

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <LiquidHover>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800"
//         >
//           <motion.div
//             className="w-5 h-5 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center"
//             animate={{ rotate: isOpen ? 360 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <span className="text-sm font-medium text-white">
//               {admin?.name?.charAt(0) || 'A'}
//             </span>
//           </motion.div>
//           <div className="hidden lg:block text-left">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               {admin?.name || 'Admin'}
//             </p>
            
//           </div>
//           <FiChevronDown
//             className={clsx(
//               "text-neutral-500 transition-transform duration-200",
//               isOpen && "rotate-180"
//             )}
//           />
//         </button>
//       </LiquidHover>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl z-50 overflow-hidden"
//           >
//             {/* Header */}
//             <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {admin?.name}
//               </p>
//               <p className="text-xs text-neutral-500 mt-1">{admin?.email}</p>
//             </div>

//             {/* Menu items */}
//             <div className="p-2">
//               <DropdownItem icon={FiGrid} label="Dashboard" href="/admin/dashboard" />
//               <DropdownItem icon={FiUser} label="Profile Settings" href="/admin/profile" />
//               <DropdownItem icon={FiSettings} label="System Settings" href="/admin/settings" />
//             </div>

//             {/* Footer */}
//             <div className="p-2 border-t border-neutral-200 dark:border-neutral-700">
//               <DropdownItem icon={FiLogOut} label="Logout" onClick={onLogout} isDanger />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });

// ProfileDropdown.displayName = "ProfileDropdown";

// // ==================== DROPDOWN ITEM ====================
// const DropdownItem = ({ icon: Icon, label, href, onClick, isDanger = false }) => {
//   const Component = href ? 'a' : 'button';
//   const props = href ? { href } : { onClick };

//   return (
//     <LiquidHover>
//       <Component
//         {...props}
//         className={clsx(
//           "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
//           isDanger 
//             ? "text-red-600 dark:text-red-400" 
//             : "text-neutral-700 dark:text-neutral-300"
//         )}
//       >
//         <Icon className="text-lg" />
//         <span>{label}</span>
//       </Component>
//     </LiquidHover>
//   );
// };

// // ==================== MOBILE MENU ====================
// const MobileMenu = memo(({ isOpen, onClose, isAuthenticated, admin, onLogout, onSearch }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 z-50"
//             onClick={onClose}
//           />

//           {/* Drawer */}
//           <motion.aside
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 30, stiffness: 300 }}
//             className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white dark:bg-neutral-900 shadow-2xl overflow-y-auto"
//           >
//             {/* Header */}
//             <div className="sticky top-0 bg-white dark:bg-neutral-900 z-10 flex items-center justify-between px-6 h-16 border-b border-neutral-200 dark:border-neutral-800">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
//                   <FiCode className="text-white text-lg" />
//                 </div>
//                 <span className="text-lg font-semibold text-neutral-900 dark:text-white">
//                   Menu
//                 </span>
//               </div>
//               <motion.button
//                 onClick={onClose}
//                 className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <FiX size={20} className="text-neutral-600 dark:text-neutral-400" />
//               </motion.button>
//             </div>

//             {/* Content */}
//             <div className="p-6 space-y-6">
//               {/* Search */}
//               <SearchBar onSearch={onSearch} isMobile onFocus={() => {}} />

//               {/* Navigation */}
//               <nav className="space-y-1">
//                 {NAV_ITEMS.map((item) => (
//                   <LiquidHover key={item.to}>
//                     <NavLink
//                       to={item.to}
//                       onClick={onClose}
//                       className={({ isActive }) =>
//                         clsx(
//                           "block px-4 py-3 rounded-lg transition-colors",
//                           isActive
//                             ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
//                             : "text-neutral-600 dark:text-neutral-400"
//                         )
//                       }
//                     >
//                       <div className="flex items-center gap-3">
//                         <item.icon className="text-lg" />
//                         <span className="text-base font-medium">{item.label}</span>
//                       </div>
//                     </NavLink>
//                   </LiquidHover>
//                 ))}
//               </nav>

//               {/* Quick Actions */}
//               <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
//                 <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">
//                   Quick Actions
//                 </p>
//                 <div className="space-y-1">
//                   {QUICK_ACTIONS.map((action) => (
//                     <LiquidHover key={action.label}>
//                       <a
//                         href={action.href}
//                         className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
//                       >
//                         <action.icon className="text-indigo-500" />
//                         <span>{action.label}</span>
//                       </a>
//                     </LiquidHover>
//                   ))}
//                 </div>
//               </div>

//               {/* Social Links */}
//               <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
//                 <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">
//                   Connect
//                 </p>
//                 <div className="grid grid-cols-3 gap-2">
//                   {SOCIAL_LINKS.map((social) => (
//                     <LiquidHover key={social.label}>
//                       <a
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex flex-col items-center gap-2 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800"
//                       >
//                         <social.icon className={clsx("text-xl", social.color)} />
//                         <span className="text-xs text-neutral-600 dark:text-neutral-400">
//                           {social.label}
//                         </span>
//                       </a>
//                     </LiquidHover>
//                   ))}
//                 </div>
//               </div>

//               {/* Admin Actions */}
//               {!isAuthenticated ? (
//                 <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
//                   <LiquidHover>
//                     <button
//                       onClick={() => {
//                         onClose();
//                         window.location.href = "/admin/login";
//                       }}
//                       className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
//                     >
//                       Admin Login
//                     </button>
//                   </LiquidHover>
//                 </div>
//               ) : (
//                 <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
//                   <div className="flex items-center gap-3 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
//                     <div className="w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
//                       <span className="text-sm font-medium text-white">
//                         {admin?.name?.charAt(0) || 'A'}
//                       </span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
//                         {admin?.name}
//                       </p>
//                       <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
//                         {admin?.email}
//                       </p>
//                     </div>
//                   </div>

//                   <LiquidHover>
//                     <button
//                       onClick={() => {
//                         onClose();
//                         window.location.href = "/admin/dashboard";
//                       }}
//                       className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
//                     >
//                       <FiGrid size={16} />
//                       Dashboard
//                     </button>
//                   </LiquidHover>

//                   <LiquidHover>
//                     <button
//                       onClick={() => {
//                         onClose();
//                         onLogout();
//                       }}
//                       className="w-full flex items-center justify-center gap-2 py-3 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
//                     >
//                       <FiLogOut size={16} />
//                       Logout
//                     </button>
//                   </LiquidHover>
//                 </div>
//               )}
//             </div>
//           </motion.aside>
//         </>
//       )}
//     </AnimatePresence>
//   );
// });

// MobileMenu.displayName = "MobileMenu";

// // ==================== MAIN HEADER COMPONENT ====================
// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();
//   const dispatch = useDispatch();
//   const headerRef = useRef(null);
//   const { scrollDirection, scrollY } = useScrollDirection();
//   const [isScrolled, setIsScrolled] = useState(false);

//   const { admin, isAuthenticated } = useSelector((s) => s.admin);

//   useEffect(() => {
//     setIsScrolled(scrollY > 20);
//   }, [scrollY]);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location.pathname]);

//   const handleLogout = useCallback(async () => {
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
//   }, [dispatch, navigate]);

//   const handleSearch = useCallback((query) => {
//     if (query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//       setMobileMenuOpen(false);
//     }
//   }, [navigate]);

//   return (
//     <>
//       <motion.header
//         initial={false}
//         animate={false}

//         ref={headerRef}
//         className={clsx(
//           "fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800",
//           "transition-transform duration-300",
//           scrollDirection === "down" && scrollY > 100 ? "-translate-y-full" : "translate-y-0"
//         )}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//       >
//         {/* Progress bar */}
//         <motion.div
//           className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
//           style={{
//             width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
//           }}
//         />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-0 left-0 z-999">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo - Always visible */}
//             <Logo onClick={() => navigate("/")} />

//             {/* Right Section - All actions grouped */}
//             <div className="flex items-center gap-4">
//               {/* Search Bar - Visible on tablet and up (md: 768px+) */}
//               <div className="hidden md:block">
//                 <SearchBar
//                   onSearch={handleSearch}
//                   isExpanded={searchFocused}
//                   onFocus={() => setSearchFocused(true)}
//                   onBlur={() => setSearchFocused(false)}
//                 />
//               </div>

//               {/* Admin Section - Desktop only (lg: 1024px+) */}
//               {!isAuthenticated ? (
//                 <div className="hidden lg:block">
//                   <LiquidHover>
//                     <button
//                       onClick={() => navigate("/admin/login")}
//                       className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl"
//                     >
//                       <FiUser size={16} className="inline mr-2" />
//                       Admin Login
//                     </button>
//                   </LiquidHover>
//                 </div>
//               ) : (
//                 <div className="hidden lg:block">
//                   <ProfileDropdown admin={admin} onLogout={handleLogout} />
//                 </div>
//               )}

//               {/* Theme Toggle - Always visible */}
//               <LiquidHover>
//                 <button
//                   onClick={toggleTheme}
//                   className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
//                   aria-label="Toggle theme"
//                 >
//                   {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
//                 </button>
//               </LiquidHover>


//               {/* Mobile Menu Button - Visible below md (< 768px) */}
//               <div className="">
//                 <LiquidHover>
//                   <button
//                     onClick={() => setMobileMenuOpen(true)}
//                     className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
//                     aria-label="Open menu"
//                   >
//                     <FiMenu size={20} />
//                   </button>
//                 </LiquidHover>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Spacer */}
//       <div className="h-16 lg:h-20" />

//       {/* Mobile Menu */}
//       <MobileMenu
//         isOpen={mobileMenuOpen}
//         onClose={() => setMobileMenuOpen(false)}
//         isAuthenticated={isAuthenticated}
//         admin={admin}
//         onLogout={handleLogout}
//         onSearch={handleSearch}
//       />
//     </>
//   );
// }

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSun,
  FiSearch,
  FiLogOut,
  FiUser,
  FiGrid,
  FiChevronDown,
  FiSettings,
  FiCode,
  FiHome,
  FiBriefcase,
  FiCpu,
  FiMessageCircle,
  FiExternalLink,
  FiClock,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { 
  SiGithub, 
  SiLinkedin, 
  SiGmail,
} from "react-icons/si";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import clsx from "clsx";
import { useTheme } from "../context/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import ApiClient from "../Common/axios";
import SummaryApi from "../Common/SummaryApi";
import { clearAuth } from "../store/slices/adminSlice";
import { motion, AnimatePresence } from "framer-motion";

// ==================== CONSTANTS ====================
const NAV_ITEMS = [
  { label: "Home", to: "/", icon: FiHome },
  { label: "Projects", to: "/projects", icon: FiBriefcase },
  { label: "Skills", to: "/skills", icon: FiCpu },
  { label: "Contact", to: "/contact", icon: FiMessageCircle },
];

const SOCIAL_LINKS = [
  { icon: SiGithub, href: "https://github.com/vikas", label: "GitHub" },
  { icon: SiLinkedin, href: "https://linkedin.com/in/vikas", label: "LinkedIn" },
  { icon: SiGmail, href: "mailto:hello@vikas.dev", label: "Email" },
];

const QUICK_LINKS = [
  { label: "Recent Projects", to: "/projects?sort=recent", icon: FiClock },
  { label: "Featured Work", to: "/admin/dashboard", icon: FiGrid },
  { label: "Top Skills", to: "/skills?filter=top", icon: FiStar },
  { label: "Trending", to: "/projects?filter=trending", icon: FiTrendingUp },
];

// ==================== CUSTOM HOOKS ====================
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      
      // Check if at top
      setIsAtTop(currentScrollY < 10);
      
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDirection, scrollY, isAtTop };
};

// ==================== LOGO COMPONENT ====================
const Logo = memo(({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-1.5 sm:gap-2 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          <FiCode className="text-white text-sm sm:text-base" />
        </div>
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur-sm"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="flex items-baseline">
        <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
          Vikas
        </span>
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          .dev
        </span>
      </div>
    </motion.button>
  );
});

Logo.displayName = "Logo";

// ==================== SEARCH BAR COMPONENT ====================
const SearchBar = memo(({ onSearch, isMobile = false }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
      inputRef.current?.blur();
    }
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={clsx(
        "relative transition-all duration-200",
        isMobile ? "w-full" : (isFocused ? "w-48 sm:w-64" : "w-36 sm:w-48")
      )}>
        <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isMobile ? "Search..." : "Search..."}
          className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 pl-8 pr-2 py-1.5 sm:py-2"
        />
        {!isMobile && !isFocused && (
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
            ⌘K
          </kbd>
        )}
      </div>
    </form>
  );
});

SearchBar.displayName = "SearchBar";

// ==================== PROFILE DROPDOWN ====================
const ProfileDropdown = memo(({ admin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <span className="text-xs font-medium text-white">
            {admin?.name?.charAt(0) || 'A'}
          </span>
        </div>
        <span className="hidden lg:inline text-sm text-neutral-700 dark:text-neutral-300">
          {admin?.name?.split(' ')[0] || 'Admin'}
        </span>
        <FiChevronDown className={clsx(
          "text-neutral-500 transition-transform text-sm",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-700">
              <p className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                {admin?.name}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">{admin?.email}</p>
            </div>
            
            <div className="p-1">
              <button
                onClick={() => { window.location.href = "/admin/dashboard"; setIsOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
              >
                <FiGrid size={14} />
                Dashboard
              </button>
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"
              >
                <FiLogOut size={14} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ProfileDropdown.displayName = "ProfileDropdown";

// ==================== MOBILE MENU ====================
const MobileMenu = memo(({ isOpen, onClose, isAuthenticated, admin, onLogout, onSearch }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white dark:bg-neutral-900 shadow-xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-white dark:bg-neutral-900 z-10 flex items-center justify-between px-4 h-14 border-b border-neutral-200 dark:border-neutral-800">
              <span className="font-semibold text-neutral-900 dark:text-white">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <FiX size={18} className="text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Search */}
              <SearchBar onSearch={onSearch} isMobile />

              {/* Navigation */}
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      )
                    }
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 mb-3">Quick Links</p>

                <div className="space-y-1">
                  {QUICK_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )
                      }
                    >
                      <link.icon size={16} />
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 mb-3">Connect</p>
                <div className="flex gap-2 items-center justify-evenly">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-7.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      <social.icon size={25} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Admin Section */}
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = "/admin/login";
                  }}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Admin Login
                </button>
              ) : (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white">
                        {admin?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {admin?.name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">{admin?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

MobileMenu.displayName = "MobileMenu";

// ==================== MAIN HEADER COMPONENT ====================
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [headerHeight, setHeaderHeight] = useState(56);

  const { admin, isAuthenticated } = useSelector((s) => s.admin);

  // Update header height on resize
  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    const observer = new ResizeObserver(updateHeight);
    const header = document.querySelector('header');
    if (header) observer.observe(header);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
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
  }, [dispatch, navigate]);

  const handleSearch = useCallback((query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setMobileMenuOpen(false);
    }
  }, [navigate]);

  // Determine if header should be hidden
  const shouldHideHeader = scrollDirection === "down" && !isAtTop;

  return (
    <>
      {/*Use motion.header to animate header when scrolled */}
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50",
          "transition-shadow duration-300",
          !isAtTop && "shadow-md"
        )}
        animate={{
          y: shouldHideHeader ? -headerHeight : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Logo onClick={() => navigate("/")} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search - tablet and up */}
              <div className="hidden md:block">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Admin - desktop only */}
              {!isAuthenticated ? (
                <div className="hidden lg:block">
                  <button
                    onClick={() => navigate("/admin/login")}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center gap-1.5"
                  >
                    <FiUser size={14} />
                    <span>Admin</span>
                  </button>
                </div>
              ) : (
                <div className="hidden lg:block">
                  <ProfileDropdown admin={admin} onLogout={handleLogout} />
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Open menu"
              >
                <FiMenu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: headerHeight }} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        admin={admin}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
    </>
  );
}