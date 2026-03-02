import { useEffect, useRef, useState } from "react";

function PortfolioBootLoader() {
  const [logs, setLogs] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const containerRef = useRef(null);

  const bootSteps = [
    { level: "SYS", msg: "Boot sequence initiated" },
    { level: "INFO", msg: "Loading kernel v4.1.2" },
    { level: "INFO", msg: "Mounting /config" },
    { level: "OK", msg: "Environment variables loaded" },
    { level: "INFO", msg: "Connecting to MongoDB cluster" },
    { level: "OK", msg: "Database handshake established" },
    { level: "INFO", msg: "Initializing authentication service" },
    { level: "OK", msg: "JWT engine online" },
    { level: "INFO", msg: "Compiling project registry" },
    { level: "INFO", msg: "Indexing featured projects" },
    { level: "OK", msg: "Registry ready" },
    { level: "INFO", msg: "Syncing skills registry" },
    { level: "OK", msg: "Skill cache validated" },
    { level: "INFO", msg: "Starting render pipeline" },
    { level: "OK", msg: "UI interface ready" }
  ];

  const randomLatency = () =>
    `${Math.floor(Math.random() * 120 + 20)}ms`;

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i >= bootSteps.length) {
        clearInterval(interval);
        setBootDone(true);
        return;
      }

      const step = bootSteps[i];

      setLogs((prev) => [
        ...prev,
        {
          ...step,
          time: new Date().toISOString().split("T")[1].split(".")[0],
          latency:
            step.level === "OK" ? randomLatency() : null
        }
      ]);

      i++;
    }, 280);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [logs]);

  const levelColor = (level) => {
    switch (level) {
      case "SYS":
        return "text-blue-400";
      case "OK":
        return "text-emerald-400";
      case "WARN":
        return "text-yellow-400";
      default:
        return "text-zinc-300";
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0e13] text-zinc-300 font-mono flex items-center justify-center relative overflow-hidden">

      {/* subtle scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,white_3px)]" />

      <div className="relative w-full max-w-5xl h-[75vh] bg-[#0a0d12] border border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col">

        {/* Header */}
        <div className="flex justify-between px-4 py-2 text-xs border-b border-zinc-800 bg-[#0d1117]">
          <span>vikas@prod-node-01</span>
          <span>
            session:{Math.random().toString(36).slice(2, 10)}
          </span>
        </div>

        {/* Metadata */}
        <div className="px-4 py-3 text-[10px] text-zinc-500 border-b border-zinc-800">
          NODE: eu-central-1 • ENV: production • MODE: secure •
          ENCRYPTION: RSA-2048
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-3 text-[12px] leading-relaxed space-y-1"
        >
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-zinc-600">
                {log.time}
              </span>
              <span className={levelColor(log.level)}>
                {log.level}
              </span>
              <span>{log.msg}</span>
              {log.latency && (
                <span className="text-zinc-500">
                  ({log.latency})
                </span>
              )}
            </div>
          ))}

          {!bootDone && (
            <div className="text-zinc-400 animate-pulse">
              ▌
            </div>
          )}

          {bootDone && (
            <div className="mt-4 text-emerald-400">
              --- SYSTEM READY ---
            </div>
          )}
        </div>

        {/* Footer metrics */}
        <div className="px-4 py-2 text-[10px] text-zinc-500 border-t border-zinc-800 flex justify-between">
          <span>
            CPU: {Math.floor(Math.random() * 40 + 20)}%
          </span>
          <span>
            MEM: {Math.floor(Math.random() * 60 + 30)}%
          </span>
          <span>STATUS: STABLE</span>
        </div>
      </div>
    </main>
  );
}

export default PortfolioBootLoader;