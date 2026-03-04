import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { RiWifiOffLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

import ApiClient from "./Common/axios";
import SummaryApi from "./Common/SummaryApi";
import GlobalProvider from "./context/GlobalProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import HeaderSkeleton from "./components/skeletons/HeaderSkeleton";
import PageLoader from "./components/ui/PageLoader";
import { initAdmin } from "./store/actions/initAdmin";

// Lazy load heavy layout components
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // Prefetch public data (projects, profile)
  const bootstrapPublicData = useCallback(async () => {
    try {
      await Promise.all([
        ApiClient({ ...SummaryApi.getProjects, skipAuth: true }),
        ApiClient({ ...SummaryApi.getProfile, skipAuth: true }),
      ]);
    } catch (err) {
      console.error("Bootstrap error:", err);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.dismiss("network-status");
      if (!isInitialMount.current) {
        toast.success("Back online");
        bootstrapPublicData();
        dispatch(initAdmin()); // re-check session when network returns
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You are offline", {
        id: "network-status",
        duration: Infinity,
        icon: <RiWifiOffLine />,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (isInitialMount.current) {
      (async () => {
        await Promise.all([
          bootstrapPublicData(),
          dispatch(initAdmin()), // hydrate admin auth from token
        ]);
        isInitialMount.current = false;
        setIsBootstrapping(false);
      })();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [bootstrapPublicData, dispatch]);

  // if (isBootstrapping) return <PageLoader />;

  return (
    <ErrorBoundary>
      <GlobalProvider>
        <div className="min-h-screen flex flex-col">
          {!isOnline && (
            <div className="bg-red-600 text-white text-center py-2 text-sm">
              You are offline. Some features may be unavailable.
            </div>
          )}

          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>

          <main className="flex-1">
            <Outlet />
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          <Toaster position="top-right" />
          <Analytics />
          <SpeedInsights />
        </div>
      </GlobalProvider>
    </ErrorBoundary>
  );
}

export default App;
