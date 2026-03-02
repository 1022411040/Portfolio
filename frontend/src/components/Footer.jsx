import { 
  FiGithub, FiLinkedin, FiMail, FiArrowUpRight, 
  FiHeart, FiCode, FiMapPin, FiClock, FiExternalLink 
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Projects', href: '/projects' },
      { name: 'Skills', href: '/skills' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'Resume', href: '/resume' },
    ],
  };

  const social = [
    {
      name: 'GitHub',
      href: 'https://github.com/vikas',
      icon: FiGithub,
      username: '@vikas',
      color: 'hover:bg-[#333]',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/vikas',
      icon: FiLinkedin,
      username: 'in/vikas',
      color: 'hover:bg-[#0077B5]',
    },
    {
      name: 'Email',
      href: 'mailto:hello@vikas.dev',
      icon: FiMail,
      username: 'hello@vikas.dev',
      color: 'hover:bg-[#EA4335]',
    },
  ];

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand column - 4 cols */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <FiCode className="text-white dark:text-neutral-900 text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950" />
              </div>
              <div>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  Vikas
                </span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400 ml-1">
                  .dev
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Full-stack engineer focused on building production-ready web applications 
              with clean architecture and performance-first thinking.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-full">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Available for work
              </span>
            </div>

            {/* Location & time */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <FiMapPin size={14} className="text-neutral-400" />
                <span>Remote / Worldwide</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <FiClock size={14} className="text-neutral-400" />
                <span>UTC+5:30 (IST)</span>
              </div>
            </div>
          </div>

          {/* Navigation columns - 4 cols */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-5">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
                    >
                      <span>{item.name}</span>
                      <FiArrowUpRight 
                        size={14} 
                        className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" 
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-5">
                Resources
              </h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
                    >
                      <span>{item.name}</span>
                      <FiExternalLink 
                        size={12} 
                        className="opacity-0 group-hover:opacity-100 transition" 
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social column - 4 cols */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-5">
              Connect
            </h3>
            <div className="space-y-3">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all hover:scale-[1.02] hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color} group-hover:text-white`}>
                      <item.icon className="text-neutral-700 dark:text-neutral-300 group-hover:text-white transition" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
                        {item.username}
                      </p>
                    </div>
                  </div>
                  <FiArrowUpRight className="text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
                </a>
              ))}
            </div>

            {/* Newsletter signup */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl">
              <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Stay updated
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                Get notified about new projects and articles.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-neutral-500 dark:text-neutral-500 order-3 sm:order-1 text-center sm:text-left">
              © {currentYear} Vikas.dev. All rights reserved.
            </p>
            
            {/* Legal links */}
            <div className="flex items-center gap-6 order-2">
              <a
                href="/privacy"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition"
              >
                Cookies
              </a>
            </div>

            {/* Back to top */}
            <a
              href="#top"
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition order-1 sm:order-3"
            >
              Back to top
              <FiArrowUpRight size={14} />
            </a>
          </div>

          {/* Built with love - centered */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
            <span>Built with</span>
            <FiHeart className="text-red-500 animate-pulse" size={12} />
            <span>using React, Tailwind, and lots of ☕</span>
          </div>

          {/* Version */}
          <div className="mt-2 text-center">
            <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono">
              v2.0.0 • production-ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}