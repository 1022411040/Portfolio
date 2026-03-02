import { FiHome, FiArrowLeft, FiTerminal, FiCommand } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const [typedPath, setTypedPath] = useState("");
  const fullPath = location.pathname;

  // Simulate typing effect for the path
  useEffect(() => {
    let i = 0;
    setTypedPath("");
    const timer = setInterval(() => {
      if (i < fullPath.length) {
        setTypedPath(prev => prev + fullPath[i]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [fullPath]);

  const suggestions = [
    { path: "/", label: "~/home" },
    { path: "/projects", label: "~/projects" },
    { path: "/skills", label: "~/skills" },
    { path: "/contact", label: "~/contact" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 font-mono">
      <div className="max-w-2xl w-full py-20">
        {/* Terminal header */}
        <div className="bg-neutral-900 rounded-t-lg border border-neutral-800 p-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-neutral-500 ml-2">bash — 80×24</span>
        </div>

        {/* Terminal content */}
        <div className="bg-neutral-900 border-x border-b border-neutral-800 rounded-b-lg p-6">
          <div className="space-y-4">
            {/* Command line */}
            <div className="flex items-start gap-2">
              <span className="text-green-400">$</span>
              <div>
                <span className="text-blue-400">curl</span>
                <span className="text-neutral-300 ml-2">{typedPath}</span>
                <span className="animate-pulse ml-1 text-neutral-500">_</span>
              </div>
            </div>

            {/* Error output */}
            <div className="mt-4 pl-4 border-l-2 border-red-500">
              <p className="text-red-400 font-bold">Error 404: Not Found</p>
              <p className="text-neutral-400 text-sm mt-1">
                The requested resource could not be found on this server.
              </p>
            </div>

            {/* Suggestions */}
            <div className="mt-6">
              <p className="text-neutral-500 text-sm mb-2">Try these paths:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map(({ path, label }) => (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="text-left px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm text-neutral-300 transition group"
                  >
                    <span className="text-blue-400">$</span>
                    <span className="ml-2 group-hover:text-white">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Help text */}
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <p className="text-xs text-neutral-500">
                Type '<span className="text-blue-400">cd ..</span>' to go back or use the commands below:
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-sm text-white transition"
          >
            <FiTerminal size={16} />
            cd ~
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-sm text-white transition"
          >
            <FiArrowLeft size={16} />
            cd ..
          </button>
        </div>
      </div>
    </div>
  );
}