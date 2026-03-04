// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Axios from "../../common/axios";
// import SummaryApi from "../../common/SummaryApi";
// import { setAdmin } from "../../store/slices/adminSlice";
// import { useDispatch } from "react-redux";

// // Custom Matrix Rain Effect (but with warm colors)
// const MatrixRain = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const columns = canvas.width / 20;
//     const drops = [];
    
//     for (let i = 0; i < columns; i++) {
//       drops[i] = Math.floor(Math.random() * -canvas.height);
//     }

//     const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

//     const draw = () => {
//       ctx.fillStyle = 'rgba(10, 10, 12, 0.05)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.fillStyle = '#876b4f'; // Warm brown
//       ctx.font = '15px monospace';

//       for (let i = 0; i < drops.length; i++) {
//         const text = chars[Math.floor(Math.random() * chars.length)];
//         ctx.fillText(text, i * 20, drops[i] * 20);
        
//         if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
//           drops[i] = 0;
//         }
//         drops[i]++;
//       }
//     };

//     const interval = setInterval(draw, 35);
//     return () => clearInterval(interval);
//   }, []);

//   return <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />;
// };

// // Custom Loader
// const CustomLoader = ({ message }) => {
//   const [dots, setDots] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const dotInterval = setInterval(() => {
//       setDots(prev => prev.length >= 3 ? '' : prev + '.');
//     }, 400);

//     const progressInterval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(progressInterval);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 60);

//     // Simulate real-time logs
//     const logMessages = [
//       "[AUTH] Validating credentials...",
//       "[CRYPTO] Generating session key...",
//       "[DB] Fetching user permissions...",
//       "[SESSION] Establishing secure channel...",
//       "[AUDIT] Logging access attempt...",
//       "[DONE] Authentication successful"
//     ];

//     let logIndex = 0;
//     const logInterval = setInterval(() => {
//       if (logIndex < logMessages.length) {
//         setLogs(prev => [...prev, logMessages[logIndex]]);
//         logIndex++;
//       }
//     }, 600);

//     return () => {
//       clearInterval(dotInterval);
//       clearInterval(progressInterval);
//       clearInterval(logInterval);
//     };
//   }, []);

//   return (
//     <div className="space-y-6 font-mono">
//       {/* Progress Bar */}
//       <div className="space-y-2">
//         <div className="flex justify-between text-xs">
//           <span className="text-[#b87c4b]">{message}{dots}</span>
//           <span className="text-[#6b5843]">{progress}%</span>
//         </div>
//         <div className="h-1 bg-[#2a241e] rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-[#b87c4b] to-[#8b5e3c] rounded-full transition-all duration-300 relative"
//             style={{ width: `${progress}%` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a373]/30 to-transparent animate-shimmer" />
//           </div>
//         </div>
//       </div>

//       {/* Real-time Logs */}
//       <div className="space-y-1 text-xs border-t border-[#3a322a] pt-4">
//         {logs.map((log, index) => (
//           <div 
//             key={index}
//             className={`animate-slideIn ${
//               log.includes('DONE') ? 'text-[#b87c4b]' : 
//               log.includes('ERROR') ? 'text-[#a05c4b]' : 
//               'text-[#6b5843]'
//             }`}
//           >
//             <span className="text-[#4a3f36]">{`${String(index + 1).padStart(2, '0')}:`}</span> {log}
//           </div>
//         ))}
//         <div className="text-[#b87c4b] animate-pulse">_</div>
//       </div>

//       {/* ASCII Art Loader */}
//       <div className="flex justify-center space-x-1 pt-4">
//         {['◓', '◑', '◒', '◐'].map((char, i) => (
//           <span 
//             key={i} 
//             className="text-[#b87c4b] text-xl animate-spin-slow"
//             style={{ animationDelay: `${i * 0.2}s` }}
//           >
//             {char}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [step, setStep] = useState('initializing'); // initializing, email, password, loading
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailValid, setEmailValid] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [terminalLines, setTerminalLines] = useState([]);
//   const [showCursor, setShowCursor] = useState(true);
//   const [currentInput, setCurrentInput] = useState('');
//   const [checkingEmail, setCheckingEmail] = useState(false);
  
//   const inputRef = useRef(null);
//   const terminalRef = useRef(null);

//   // Initial terminal messages
//   useEffect(() => {
//     const messages = [
//       { text: "SYSTEM v3.2.0 - SECURE TERMINAL", type: "system", delay: 0 },
//       { text: "INITIALIZING SECURE CONNECTION...", type: "system", delay: 500 },
//       { text: "LOADING ENCRYPTION MODULES...", type: "system", delay: 1000 },
//       { text: "ESTABLISHING HANDSHAKE PROTOCOL...", type: "system", delay: 1500 },
//       { text: "CONNECTING TO SECURE SERVER...", type: "system", delay: 2000 },
//       { text: "AWAITING CREDENTIALS..._", type: "prompt", delay: 2500 },
//     ];

//     const timers = [];
//     messages.forEach((msg) => {
//       const timer = setTimeout(() => {
//         setTerminalLines(prev => [...prev, msg]);
//         if (msg.type === "prompt") {
//           setStep('email');
//         }
//       }, msg.delay);
//       timers.push(timer);
//     });

//     return () => timers.forEach(clearTimeout);
//   }, []);

//   // Auto-scroll terminal
//   useEffect(() => {
//     if (terminalRef.current) {
//       terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
//     }
//   }, [terminalLines]);

//   // Cursor blink
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowCursor(prev => !prev);
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   // Focus input when step changes
//   useEffect(() => {
//     if (step === 'email' || step === 'password') {
//       inputRef.current?.focus();
//     }
//   }, [step]);

//   const checkEmailExists = async (emailToCheck) => {
//     setCheckingEmail(true);
//     try {
//       // Simulate API call to check email
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // For demo purposes, consider any email with @ exists
//       const exists = emailToCheck.includes('@') && emailToCheck.includes('.');
      
//       if (exists) {
//         setTerminalLines(prev => [
//           ...prev,
//           { text: `> Email verified: ${emailToCheck}`, type: "success" },
//           { text: "> Password required:", type: "prompt" }
//         ]);
//         setStep('password');
//         setEmailValid(true);
//       } else {
//         setTerminalLines(prev => [
//           ...prev,
//           { text: `> Error: Email not registered in system`, type: "error" },
//           { text: "> AWAITING CREDENTIALS..._", type: "prompt" }
//         ]);
//         setEmail('');
//         setStep('email');
//       }
//     } catch (error) {
//       setTerminalLines(prev => [
//         ...prev,
//         { text: `> Error: Could not verify email`, type: "error" }
//       ]);
//     } finally {
//       setCheckingEmail(false);
//     }
//   };

//   const handleKeyDown = async (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
      
//       if (step === 'email' && currentInput) {
//         // Add email to terminal
//         setTerminalLines(prev => [
//           ...prev,
//           { text: `> ${currentInput}`, type: "input" }
//         ]);
        
//         const emailToCheck = currentInput;
//         setEmail(emailToCheck);
//         setCurrentInput('');
//         await checkEmailExists(emailToCheck);
//       }
//       else if (step === 'password' && currentInput) {
//         // Hide password input in terminal
//         setTerminalLines(prev => [
//           ...prev,
//           { text: `> ${'•'.repeat(currentInput.length)}`, type: "input" }
//         ]);
        
//         setPassword(currentInput);
//         setCurrentInput('');
        
//         // Start login process
//         setStep('loading');
//         setLoading(true);
        
//         // Add login initiated message
//         setTerminalLines(prev => [
//           ...prev,
//           { text: "> Authenticating credentials...", type: "system" }
//         ]);

//         try {
//           const { data } = await Axios({
//             url: SummaryApi.adminLogin.url,
//             method: SummaryApi.adminLogin.method,
//             data: { email, password: currentInput },
//             skipAuth: true,
//           });

//           const { accessToken, refreshToken, admin } = data.data;

//           setTerminalLines(prev => [
//             ...prev,
//             { text: "> Authentication successful!", type: "success" },
//             { text: "> Generating session token...", type: "success" },
//             { text: "> Redirecting to dashboard...", type: "success" }
//           ]);

//           localStorage.setItem("accessToken", accessToken);
//           localStorage.setItem("refreshToken", refreshToken);

//           dispatch(setAdmin(admin));
          
//           setTimeout(() => {
//             navigate("/admin/dashboard", { replace: true });
//           }, 2000);
          
//         } catch (err) {
//           setTerminalLines(prev => [
//             ...prev,
//             { text: "> Error: Authentication failed", type: "error" },
//             { text: "> AWAITING CREDENTIALS..._", type: "prompt" }
//           ]);
//           setStep('email');
//           setLoading(false);
//           setPassword('');
//           setError("Access denied");
//         }
//       }
//     } else if (e.key === 'Backspace') {
//       setCurrentInput(prev => prev.slice(0, -1));
//     } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
//       setCurrentInput(prev => prev + e.key);
//     }
//   };

//   const getPromptText = () => {
//     if (step === 'email') return 'Email: ';
//     if (step === 'password') return 'Password: ';
//     return '';
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0806] text-[#d4a373] font-mono relative overflow-hidden">
      
//       {/* Background Effects */}
//       <MatrixRain />
      
//       {/* Noise Texture */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none" 
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//           backgroundRepeat: 'repeat',
//           backgroundSize: '100px 100px'
//         }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
//         <div className="w-full max-w-3xl">
          
//           {/* Terminal Window */}
//           <div className="bg-[#0c0a08] border border-[#3a322a] rounded-lg shadow-2xl overflow-hidden">
            
//             {/* Terminal Header */}
//             <div className="bg-[#1a1510] px-4 py-2 flex items-center justify-between border-b border-[#3a322a]">
//               <div className="flex items-center space-x-2">
//                 <div className="flex space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-[#5f4a38]" />
//                   <div className="w-3 h-3 rounded-full bg-[#5f4a38]/70" />
//                   <div className="w-3 h-3 rounded-full bg-[#5f4a38]/40" />
//                 </div>
//                 <span className="text-xs text-[#6b5843] ml-2">vikas@secure-terminal:~/access</span>
//               </div>
//               <div className="text-xs text-[#6b5843]">
//                 {new Date().toLocaleTimeString()}
//               </div>
//             </div>

//             {/* Terminal Body */}
//             <div 
//               ref={terminalRef}
//               className="h-[500px] overflow-y-auto p-6 space-y-2 scrollbar-thin scrollbar-thumb-[#3a322a] scrollbar-track-[#0c0a08]"
//               onClick={() => inputRef.current?.focus()}
//             >
//               {/* Previous lines */}
//               {terminalLines.map((line, index) => (
//                 <div 
//                   key={index} 
//                   className={`font-mono text-sm animate-slideIn ${
//                     line.type === 'error' ? 'text-[#a05c4b]' :
//                     line.type === 'success' ? 'text-[#b87c4b]' :
//                     line.type === 'input' ? 'text-[#d4a373]' :
//                     line.type === 'prompt' ? 'text-[#8b6e4b]' :
//                     'text-[#6b5843]'
//                   }`}
//                 >
//                   {line.text}
//                 </div>
//               ))}

//               {/* Current input line */}
//               {(step === 'email' || step === 'password') && (
//                 <div className="flex items-center font-mono text-sm text-[#d4a373]">
//                   <span className="mr-2">{getPromptText()}</span>
//                   <span>{currentInput}</span>
//                   {showCursor && <span className="ml-0.5 animate-pulse">_</span>}
//                 </div>
//               )}

//               {/* Loader */}
//               {step === 'loading' && (
//                 <div className="pt-4">
//                   <CustomLoader message="Processing authentication" />
//                 </div>
//               )}

//               {/* Hidden input for capturing keys */}
//               {(step === 'email' || step === 'password') && (
//                 <input
//                   ref={inputRef}
//                   type={step === 'password' ? 'password' : 'text'}
//                   value={currentInput}
//                   onChange={() => {}} // Controlled by keydown
//                   onKeyDown={handleKeyDown}
//                   className="opacity-0 absolute -left-full"
//                   autoFocus
//                 />
//               )}
//             </div>

//             {/* Terminal Footer */}
//             <div className="bg-[#1a1510] px-4 py-2 border-t border-[#3a322a] flex items-center justify-between text-xs text-[#6b5843]">
//               <div className="flex items-center space-x-4">
//                 <span className="flex items-center space-x-1">
//                   <span className="w-2 h-2 rounded-full bg-[#6b5843] animate-pulse" />
//                   <span>SYSTEM SECURE</span>
//                 </span>
//                 <span>ENCRYPTION: AES-256</span>
//               </div>
//               <div>
//                 {step === 'email' && 'Waiting for email input...'}
//                 {step === 'password' && 'Enter password...'}
//                 {step === 'loading' && 'Processing...'}
//                 {step === 'initializing' && 'Booting system...'}
//               </div>
//             </div>
//           </div>

//           {/* System Info Bar */}
//           <div className="mt-4 flex justify-between text-[10px] text-[#4a3f36]">
//             <span>SECURE SHELL • v3.2.0</span>
//             <span>© 2024 VIKAS.DEV • ALL RIGHTS RESERVED</span>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS Animations */}
//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(100%);
//           }
//         }
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         .animate-slideIn {
//           animation: slideIn 0.2s ease-out forwards;
//         }
        
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 2s linear infinite;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: #0c0a08;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #3a322a;
//           border-radius: 3px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: #4a3f36;
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Common/axios";
import SummaryApi from "../../Common/SummaryApi";
import { setAdmin } from "../../store/slices/adminSlice";
import { useDispatch } from "react-redux";

// Custom Matrix Rain Effect (but with vibrant colors)
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = canvas.width / 20;
    const drops = [];
    
    // Colorful palette for matrix rain
    const colors = ['#00ff9d', '#00b8ff', '#ff00aa', '#ffd700', '#ff4d4d', '#9d4dff', '#00ffff'];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        // Random color for each column
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.font = '15px monospace';
        
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />;
};

// Custom Loader with vibrant colors
const CustomLoader = ({ message }) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Simulate real-time logs with colorful prefixes
    const logMessages = [
      "[AUTH] Validating credentials...",
      "[CRYPTO] Generating session key...",
      "[DB] Fetching user permissions...",
      "[SESSION] Establishing secure channel...",
      "[AUDIT] Logging access attempt...",
      "[DONE] Authentication successful"
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs(prev => [...prev, logMessages[logIndex]]);
        logIndex++;
      }
    }, 600);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  // Function to get color based on log type
  const getLogColor = (log) => {
    if (log.includes('AUTH')) return '#00b8ff';
    if (log.includes('CRYPTO')) return '#ff00aa';
    if (log.includes('DB')) return '#00ff9d';
    if (log.includes('SESSION')) return '#ffd700';
    if (log.includes('AUDIT')) return '#ff4d4d';
    if (log.includes('DONE')) return '#00ff9d';
    return '#888888';
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-[#00b8ff]">{message}{dots}</span>
          <span className="text-[#ffd700]">{progress}%</span>
        </div>
        <div className="h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00ff9d] via-[#00b8ff] to-[#ff00aa] rounded-full transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Real-time Logs */}
      <div className="space-y-1 text-xs border-t border-[#2a2a3a] pt-4">
        {logs.map((log, index) => (
          <div 
            key={index}
            className={`animate-slideIn`}
            style={{ color: getLogColor(log) }}
          >
            <span className="text-[#4a4a5a]">{`${String(index + 1).padStart(2, '0')}:`}</span> {log}
          </div>
        ))}
        <div className="text-[#00b8ff] animate-pulse">_</div>
      </div>

      {/* Colorful ASCII Loader */}
      <div className="flex justify-center space-x-2 pt-4">
        {['◓', '◑', '◒', '◐'].map((char, i) => (
          <span 
            key={i} 
            className="text-2xl animate-spin-slow"
            style={{ 
              color: ['#00ff9d', '#00b8ff', '#ff00aa', '#ffd700'][i % 4],
              animationDelay: `${i * 0.2}s`,
              textShadow: `0 0 10px ${['#00ff9d80', '#00b8ff80', '#ff00aa80', '#ffd70080'][i % 4]}`
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState('initializing'); // initializing, email, password, loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [terminalLines, setTerminalLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [currentInput, setCurrentInput] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Color palette for terminal lines
  const lineColors = {
    system: '#00b8ff',
    prompt: '#ffd700',
    input: '#00ff9d',
    success: '#00ff9d',
    error: '#ff4d4d',
    warning: '#ffaa00',
    info: '#888888'
  };

  // Initial terminal messages with colors
  useEffect(() => {
    const messages = [
      { text: "╔══════════════════════════════════════╗", type: "system", delay: 0 },
      { text: "║     VIKAS SECURE TERMINAL v3.2.0     ║", type: "system", delay: 100 },
      { text: "╚══════════════════════════════════════╝", type: "system", delay: 200 },
      { text: "", type: "system", delay: 300 },
      { text: "⚡ INITIALIZING SECURE CONNECTION...", type: "system", delay: 500 },
      { text: "🔐 LOADING ENCRYPTION MODULES...", type: "system", delay: 1000 },
      { text: "🌐 ESTABLISHING HANDSHAKE PROTOCOL...", type: "system", delay: 1500 },
      { text: "🖥️  CONNECTING TO SECURE SERVER...", type: "system", delay: 2000 },
      { text: "", type: "system", delay: 2200 },
      { text: "┌──(vikas㉿secure-terminal)-[~]", type: "prompt", delay: 2500 },
      { text: "└─$ Enter credentials to continue_", type: "prompt", delay: 2600 },
    ];

    const timers = [];
    messages.forEach((msg) => {
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, msg]);
        if (msg.text.includes("Enter credentials")) {
          setStep('email');
        }
      }, msg.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Focus input when step changes
  useEffect(() => {
    if (step === 'email' || step === 'password') {
      inputRef.current?.focus();
    }
  }, [step]);

  const checkEmailExists = async (emailToCheck) => {
    setCheckingEmail(true);
    try {
      // Simulate API call to check email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, consider any email with @ exists
      const exists = emailToCheck.includes('@') && emailToCheck.includes('.');
      
      if (exists) {
        setTerminalLines(prev => [
          ...prev,
          { text: `✅ Email verified: ${emailToCheck}`, type: "success" },
          { text: "", type: "system" },
          { text: "┌──(vikas㉿secure-terminal)-[~]", type: "prompt" },
          { text: "└─$ Enter password:_", type: "prompt" }
        ]);
        setStep('password');
        setEmailValid(true);
      } else {
        setTerminalLines(prev => [
          ...prev,
          { text: `❌ Error: Email not registered in system`, type: "error" },
          { text: "", type: "system" },
          { text: "┌──(vikas㉿secure-terminal)-[~]", type: "prompt" },
          { text: "└─$ Enter email:_", type: "prompt" }
        ]);
        setEmail('');
        setStep('email');
      }
    } catch (error) {
      setTerminalLines(prev => [
        ...prev,
        { text: `❌ Error: Could not verify email`, type: "error" }
      ]);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (step === 'email' && currentInput) {
        // Add email to terminal
        setTerminalLines(prev => [
          ...prev,
          { text: `📧 ${currentInput}`, type: "input" }
        ]);
        
        const emailToCheck = currentInput;
        setEmail(emailToCheck);
        setCurrentInput('');
        await checkEmailExists(emailToCheck);
      }
      else if (step === 'password' && currentInput) {
        // Hide password input in terminal
        setTerminalLines(prev => [
          ...prev,
          { text: `🔑 ${'•'.repeat(currentInput.length)}`, type: "input" }
        ]);
        
        setPassword(currentInput);
        setCurrentInput('');
        
        // Start login process
        setStep('loading');
        setLoading(true);
        
        // Add login initiated message
        setTerminalLines(prev => [
          ...prev,
          { text: "⚡ Authenticating credentials...", type: "system" }
        ]);

        try {
          const { data } = await Axios({
            url: SummaryApi.adminLogin.url,
            method: SummaryApi.adminLogin.method,
            data: { email, password: currentInput },
            skipAuth: true,
          });

          const { accessToken, refreshToken, admin } = data.data;

          setTerminalLines(prev => [
            ...prev,
            { text: "✅ Authentication successful!", type: "success" },
            { text: "🔐 Generating session token...", type: "success" },
            { text: "🚀 Redirecting to dashboard...", type: "success" }
          ]);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch(setAdmin(admin));
          
          setTimeout(() => {
            navigate("/admin/dashboard", { replace: true });
          }, 2000);
          
        } catch (err) {
          setTerminalLines(prev => [
            ...prev,
            { text: "❌ Error: Authentication failed", type: "error" },
            { text: "", type: "system" },
            { text: "┌──(vikas㉿secure-terminal)-[~]", type: "prompt" },
            { text: "└─$ Enter email:_", type: "prompt" }
          ]);
          setStep('email');
          setLoading(false);
          setPassword('');
          setError("Access denied");
        }
      }
    } else if (e.key === 'Backspace') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setCurrentInput(prev => prev + e.key);
    }
  };

  const getPromptText = () => {
    if (step === 'email') return '└─$ Enter email: ';
    if (step === 'password') return '└─$ Enter password: ';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f0f1f] to-[#1a1a2e] text-[#00b8ff] font-mono relative overflow-hidden">
      
      {/* Background Effects */}
      <MatrixRain />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d10] via-transparent to-[#ff00aa10] pointer-events-none" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          
          {/* Terminal Window */}
          <div className="bg-[#0a0a1a]/90 backdrop-blur-sm border border-[#2a2a3a] rounded-lg shadow-2xl overflow-hidden shadow-[#00b8ff20]">
            
            {/* Terminal Header */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1f] px-4 py-2 flex items-center justify-between border-b border-[#2a2a3a]">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff4d4d] shadow-lg shadow-[#ff4d4d80]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffd700] shadow-lg shadow-[#ffd70080]" />
                  <div className="w-3 h-3 rounded-full bg-[#00ff9d] shadow-lg shadow-[#00ff9d80]" />
                </div>
                <span className="text-xs text-[#888888] ml-2">
                  <span className="text-[#00ff9d]">vikas</span>
                  <span className="text-[#888888]">@</span>
                  <span className="text-[#00b8ff]">secure-terminal</span>
                  <span className="text-[#888888]">:~/access</span>
                </span>
              </div>
              <div className="text-xs text-[#888888]">
                <span className="text-[#ffd700]">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="h-[500px] overflow-y-auto p-6 space-y-2 scrollbar-thin scrollbar-thumb-[#2a2a3a] scrollbar-track-[#0a0a1a]"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Previous lines */}
              {terminalLines.map((line, index) => (
                <div 
                  key={index} 
                  className={`font-mono text-sm animate-slideIn`}
                  style={{ color: lineColors[line.type] || '#888888' }}
                >
                  {line.text}
                </div>
              ))}

              {/* Current input line */}
              {(step === 'email' || step === 'password') && (
                <div className="flex items-center font-mono text-sm">
                  <span className="mr-2 text-[#ffd700]">{getPromptText()}</span>
                  <span className="text-[#00ff9d]">{currentInput}</span>
                  {showCursor && <span className="ml-0.5 text-[#00b8ff] animate-pulse">█</span>}
                </div>
              )}

              {/* Loader */}
              {step === 'loading' && (
                <div className="pt-4">
                  <CustomLoader message="Processing authentication" />
                </div>
              )}

              {/* Hidden input for capturing keys */}
              {(step === 'email' || step === 'password') && (
                <input
                  ref={inputRef}
                  type={step === 'password' ? 'password' : 'text'}
                  value={currentInput}
                  onChange={() => {}} // Controlled by keydown
                  onKeyDown={handleKeyDown}
                  className="opacity-0 absolute -left-full"
                  autoFocus
                />
              )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1f] px-4 py-2 border-t border-[#2a2a3a] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse shadow-lg shadow-[#00ff9d80]" />
                  <span className="text-[#00ff9d]">SYSTEM SECURE</span>
                </span>
                <span className="text-[#888888]">
                  <span className="text-[#ff00aa]">ENCRYPTION</span>
                  <span className="text-[#888888]">: </span>
                  <span className="text-[#00b8ff]">AES-256</span>
                </span>
              </div>
              <div className="text-[#888888]">
                {step === 'email' && <span className="text-[#ffd700]">Waiting for email input...</span>}
                {step === 'password' && <span className="text-[#ffd700]">Enter password...</span>}
                {step === 'loading' && <span className="text-[#00ff9d]">Processing...</span>}
                {step === 'initializing' && <span className="text-[#00b8ff]">Booting system...</span>}
              </div>
            </div>
          </div>

          {/* System Info Bar */}
          <div className="mt-4 flex justify-between text-[10px] text-[#4a4a5a]">
            <span>
              <span className="text-[#00ff9d]">SECURE SHELL</span>
              <span className="text-[#888888]"> • </span>
              <span className="text-[#00b8ff]">v3.2.0</span>
            </span>
            <span>
              <span className="text-[#ff00aa]">© 2024 VIKAS.DEV</span>
              <span className="text-[#888888]"> • </span>
              <span className="text-[#ffd700]">ALL RIGHTS RESERVED</span>
            </span>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.2s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #0a0a1a;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #2a2a3a;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3a3a4a;
        }
      `}</style>
    </div>
  );
}