import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiCpu, FiZap, FiLoader } from "react-icons/fi";
import { useEffect, useState } from "react";
import clsx from "clsx";

// ==================== TYPE DEFINITIONS ====================
export const LOADER_TYPES = {
  DEFAULT: "default",
  CODE: "code",
  GEOMETRIC: "geometric",
  MINIMAL: "minimal",
  PROGRESS: "progress",
  SKELETON: "skeleton",
};

// ==================== LOADER VARIANTS ====================

// 1. Liquid Code Loader (Matches header aesthetic)
const LiquidCodeLoader = ({ progress }) => {
  const codeLines = [
    "const portfolio = await fetch();",
    "const skills = ['React', 'Node', 'TS'];",
    "projects.map(render);",
    "<Header /> // Loading...",
    "export default function App() {",
    "return <Loader />;",
  ];

  return (
    <div className="relative">
      {/* Background liquid effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Code animation */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 min-w-75">
        {/* Window controls */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-neutral-500 ml-2">loading.tsx</span>
        </div>

        {/* Animated code lines */}
        <div className="space-y-3">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: progress ? 1 : [0, 1][Math.floor(Math.random() * 2)],
                x: 0 
              }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                repeat: progress ? 0 : Infinity,
                repeatDelay: 2,
              }}
              className="flex items-center gap-2"
            >
              <span className="text-xs text-neutral-400 w-6">{(index + 1).toString().padStart(2, '0')}</span>
              <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">{line}</span>
              {index === 2 && (
                <motion.div
                  className="w-1 h-4 bg-indigo-500"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        {progress !== undefined && (
          <div className="mt-4">
            <div className="h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2 text-right">{progress}% loaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Geometric Loader
const GeometricLoader = () => {
  return (
    <div className="relative">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Rotating squares */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <rect
            x="20"
            y="20"
            width="80"
            height="80"
            rx="8"
            className="fill-none stroke-indigo-500 stroke-2"
            strokeDasharray="4 4"
          />
        </motion.g>

        {/* Pulsing circles */}
        <motion.circle
          cx="60"
          cy="60"
          r="20"
          className="fill-purple-500/20 stroke-purple-500 stroke-2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={60 + Math.cos(i * 120 * (Math.PI / 180)) * 40}
            cy={60 + Math.sin(i * 120 * (Math.PI / 180)) * 40}
            r="4"
            className="fill-indigo-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// 3. Minimal Dot Loader
const MinimalDotLoader = () => {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-indigo-500 rounded-full"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 4. Terminal Loader
const TerminalLoader = () => {
  const [text, setText] = useState("");
  const fullText = "> Loading portfolio...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono">
      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
        <FiZap className="text-indigo-500" />
        <span className="text-sm">{text}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-2 h-4 bg-indigo-500"
        />
      </div>
    </div>
  );
};

// 5. Progress Ring Loader
const ProgressRingLoader = ({ progress = 0 }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background ring */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="fill-none stroke-neutral-200 dark:stroke-neutral-800"
          strokeWidth="4"
        />
        
        {/* Progress ring */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          className="fill-none stroke-indigo-500"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          style={{
            strokeDasharray: circumference,
            rotate: -90,
            transformOrigin: "center",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Percentage text */}
        <text
          x="60"
          y="65"
          textAnchor="middle"
          className="text-lg font-bold fill-neutral-900 dark:fill-white"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

// 6. Skeleton Loader (for content)
const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-1 space-y-2">
          <motion.div
            className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Content skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <motion.div
            className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
          <motion.div
            className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.1 }}
          />
        </div>
      ))}
    </div>
  );
};

// ==================== MAIN PAGE LOADER ====================
export default function PageLoader({ 
  type = LOADER_TYPES.CODE, 
  fullScreen = true,
  text = "Loading...",
  progress,
  className = "",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const renderLoader = () => {
    switch (type) {
      case LOADER_TYPES.GEOMETRIC:
        return <GeometricLoader />;
      case LOADER_TYPES.MINIMAL:
        return <MinimalDotLoader />;
      case LOADER_TYPES.PROGRESS:
        return <ProgressRingLoader progress={progress || 0} />;
      case LOADER_TYPES.SKELETON:
        return <SkeletonLoader />;
      case LOADER_TYPES.CODE:
      default:
        return <LiquidCodeLoader progress={progress} />;
    }
  };

  const LoaderContent = () => (
    <div className={clsx(
      "flex flex-col items-center justify-center gap-6",
      !fullScreen && "p-8"
    )}>
      {renderLoader()}
      
      {text && type !== LOADER_TYPES.CODE && type !== LOADER_TYPES.TERMINAL && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-neutral-600 dark:text-neutral-400"
        >
          {text}
        </motion.p>
      )}

      {/* Terminal loader has its own text */}
      {type === LOADER_TYPES.TERMINAL && <TerminalLoader />}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={clsx(
        "min-h-screen bg-white dark:bg-neutral-900",
        "flex items-center justify-center",
        className
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <LoaderContent />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return <LoaderContent />;
}

// ==================== INLINE LOADER ====================
export const InlineLoader = ({ size = "md", color = "indigo" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colors = {
    indigo: "border-indigo-500",
    purple: "border-purple-500",
    blue: "border-blue-500",
    green: "border-green-500",
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={clsx(
          "border-2 border-t-transparent rounded-full",
          sizes[size],
          colors[color] || colors.indigo
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// ==================== PAGE TRANSITION LOADER ====================
export const PageTransitionLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: "0%" }}
    />
  );
};

// ==================== USAGE EXAMPLES ====================
/*
// Basic usage
<PageLoader />

// With progress
<PageLoader type="progress" progress={75} />

// Skeleton loader for content
<PageLoader type="skeleton" fullScreen={false} />

// Minimal dot loader
<PageLoader type="minimal" text="Loading your experience..." />

// Inline loader
<InlineLoader size="lg" color="purple" />

// Page transition
<PageTransitionLoader />
*/