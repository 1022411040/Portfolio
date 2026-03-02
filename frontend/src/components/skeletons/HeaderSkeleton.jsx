import { motion } from "framer-motion";
import { FiCode, FiSearch, FiSun, FiMoon, FiUser } from "react-icons/fi";
import clsx from "clsx";

// ==================== SKELETON VARIANTS ====================

// 1. Liquid Wave Skeleton (Matches header aesthetic)
const LiquidWaveSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated wave background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 dark:via-white/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          delay: 0.5,
        }}
      />
    </div>
  );
};

// 2. Pulse Skeleton
const PulseSkeleton = () => {
  return (
    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800">
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// 3. Geometric Skeleton
const GeometricSkeleton = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <pattern
          id="grid"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <motion.path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-300 dark:text-neutral-700"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Moving dot */}
      <motion.div
        className="absolute w-1 h-1 bg-indigo-500/30 rounded-full"
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// ==================== SKELETON COMPONENTS ====================

const SkeletonLogo = ({ variant = "wave" }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      {/* Icon */}
      <div className="relative w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden">
        {variant === "wave" && <LiquidWaveSkeleton />}
        {variant === "pulse" && <PulseSkeleton />}
        {variant === "geometric" && <GeometricSkeleton />}
      </div>
      
      {/* Text */}
      <div className="flex items-baseline gap-1">
        <div className="relative w-12 h-6 bg-neutral-200 dark:bg-neutral-800 rounded overflow-hidden">
          {variant === "wave" && <LiquidWaveSkeleton />}
          {variant === "pulse" && <PulseSkeleton />}
        </div>
        <div className="relative w-8 h-6 bg-neutral-200 dark:bg-neutral-800 rounded overflow-hidden">
          {variant === "wave" && <LiquidWaveSkeleton />}
          {variant === "pulse" && <PulseSkeleton />}
        </div>
      </div>
    </div>
  );
};

const SkeletonSearch = ({ variant = "wave" }) => {
  return (
    <div className="relative w-64 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden">
      {/* Search icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
      
      {/* Input background */}
      {variant === "wave" && <LiquidWaveSkeleton />}
      {variant === "pulse" && <PulseSkeleton />}
      {variant === "geometric" && <GeometricSkeleton />}
      
      {/* Keyboard shortcut */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-5 bg-neutral-300 dark:bg-neutral-700 rounded" />
    </div>
  );
};

const SkeletonThemeToggle = ({ variant = "wave" }) => {
  return (
    <div className="relative w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden">
      {variant === "wave" && <LiquidWaveSkeleton />}
      {variant === "pulse" && <PulseSkeleton />}
      {variant === "geometric" && <GeometricSkeleton />}
    </div>
  );
};

const SkeletonAdminButton = ({ variant = "wave" }) => {
  return (
    <div className="relative w-32 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden">
      {variant === "wave" && <LiquidWaveSkeleton />}
      {variant === "pulse" && <PulseSkeleton />}
      {variant === "geometric" && <GeometricSkeleton />}
    </div>
  );
};

const SkeletonProfile = ({ variant = "wave" }) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      {/* Avatar */}
      <div className="relative w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        {variant === "wave" && <LiquidWaveSkeleton />}
        {variant === "pulse" && <PulseSkeleton />}
      </div>
      
      {/* Name and role */}
      <div className="space-y-1">
        <div className="relative w-20 h-3 bg-neutral-200 dark:bg-neutral-800 rounded overflow-hidden">
          {variant === "wave" && <LiquidWaveSkeleton />}
        </div>
        <div className="relative w-16 h-2 bg-neutral-200 dark:bg-neutral-800 rounded overflow-hidden">
          {variant === "wave" && <LiquidWaveSkeleton />}
        </div>
      </div>
    </div>
  );
};

const SkeletonHamburger = ({ variant = "wave" }) => {
  return (
    <div className="relative w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden md:hidden">
      {variant === "wave" && <LiquidWaveSkeleton />}
      {variant === "pulse" && <PulseSkeleton />}
      {variant === "geometric" && <GeometricSkeleton />}
    </div>
  );
};

// ==================== MAIN HEADER SKELETON ====================
export default function HeaderSkeleton({ 
  variant = "wave", // "wave" | "pulse" | "geometric"
  layout = "default", // "default" | "compact" | "minimal"
  isAuthenticated = false,
  showSearch = true,
  className = "",
}) {
  // Layout variants
  const layouts = {
    default: {
      container: "h-16 lg:h-20",
      spacing: "gap-2",
    },
    compact: {
      container: "h-14",
      spacing: "gap-1",
    },
    minimal: {
      container: "h-12",
      spacing: "gap-1",
    },
  };

  const currentLayout = layouts[layout] || layouts.default;

  return (
    <div className={clsx(
      "fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800",
      currentLayout.container,
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Always visible */}
          <SkeletonLogo variant={variant} />

          {/* Right section */}
          <div className={clsx("flex items-center", currentLayout.spacing)}>
            {/* Search - Hidden on mobile, visible on tablet+ */}
            {showSearch && (
              <div className="hidden md:block">
                <SkeletonSearch variant={variant} />
              </div>
            )}

            {/* Theme toggle - Always visible */}
            <SkeletonThemeToggle variant={variant} />

            {/* Admin section - Hidden on mobile/tablet, visible on desktop */}
            {isAuthenticated ? (
              <div className="hidden lg:block">
                <SkeletonProfile variant={variant} />
              </div>
            ) : (
              <div className="hidden lg:block">
                <SkeletonAdminButton variant={variant} />
              </div>
            )}

            {/* Hamburger - Visible on mobile/tablet */}
            <SkeletonHamburger variant={variant} />
          </div>
        </div>
      </div>

      {/* Progress bar skeleton */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}

// ==================== DETAILED SKELETON COMPONENTS ====================

// For page loads with more detail
export const DetailedHeaderSkeleton = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with animated dots */}
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="relative w-8 h-8 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl">
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="space-y-1">
              <div className="flex gap-1">
                <div className="w-12 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="w-8 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>
              {/* Status dot */}
              <motion.div
                className="w-1.5 h-1.5 bg-green-500/50 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Right section with detailed skeletons */}
          <div className="flex items-center gap-2">
            {/* Search with icon */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <FiSearch className="text-neutral-400" />
              <div className="w-48 h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="w-8 h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>

            {/* Theme toggle with pulse */}
            <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <FiSun className="text-neutral-400" />
              </motion.div>
            </div>

            {/* Admin button with shimmer */}
            <div className="hidden lg:block px-4 py-2 bg-indigo-500/20 rounded-xl">
              <div className="flex items-center gap-2">
                <FiUser className="text-indigo-400/50" />
                <div className="w-16 h-4 bg-indigo-400/20 rounded" />
              </div>
            </div>

            {/* Hamburger */}
            <div className="md:hidden p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <div className="w-5 h-5 bg-neutral-400/50 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MOBILE MENU SKELETON ====================
export const MobileMenuSkeleton = () => {
  return (
    <div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white dark:bg-neutral-900 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-16 h-5 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />

        {/* Navigation items */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        ))}

        {/* Quick actions */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="w-24 h-3 bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="w-20 h-3 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 dark:via-white/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// ==================== USAGE EXAMPLES ====================
/*
// Basic usage (matches header exactly)
<HeaderSkeleton />

// With different animation variant
<HeaderSkeleton variant="geometric" />

// Authenticated state
<HeaderSkeleton isAuthenticated={true} />

// Without search
<HeaderSkeleton showSearch={false} />

// Compact layout
<HeaderSkeleton layout="compact" />

// Detailed skeleton for page loads
<DetailedHeaderSkeleton />

// Mobile menu skeleton
<MobileMenuSkeleton />
*/