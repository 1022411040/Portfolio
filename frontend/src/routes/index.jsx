import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PageLoader from "../components/ui/PageLoader";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import ContactsAdmin from "../pages/ContactsAdmin";

// Lazy pages
const Home = lazy(() => import("../pages/Home"));
// const Projects = lazy(() => import("../pages/public/Projects"));
// const ProjectDetails = lazy(() => import("../pages/public/ProjectDetails"));
// const About = lazy(() => import("../pages/public/About"));
// const Contact = lazy(() => import("../pages/public/Contact"));

const Login = lazy(() => import("../pages/admin/Loginpage"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const ProjectsAdmin = lazy(() => import("../pages/admin/ProjectsAdmin"));
const SkillsAdmin = lazy(() => import("../pages/admin/SkillsAdmin"));
const ProfileAdmin = lazy(() => import("../pages/admin/ProfileAdmin"));
const SeoAdmin = lazy(() => import("../pages/admin/SeoAdmin"));
const TestimonialsAdmin = lazy(() => import("../pages/admin/TestimonialsAdmin"));
const NotFound = lazy(() => import("../components/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
    //   { path: "projects", element: <Projects /> },
    //   { path: "projects/:slug", element: <ProjectDetails /> },
    //   { path: "about", element: <About /> },
    //   { path: "contact", element: <Contact /> },

      { path: "admin/login", element: <Login /> },

      {
        path: "admin",
        element: <PrivateRoute />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "projects", element: <ProjectsAdmin /> },
          { path: "skills", element: <SkillsAdmin /> },
          { path: "profile", element: <ProfileAdmin /> },
          { path: "seo", element: <SeoAdmin /> },
          { path: "testimonials", element: <TestimonialsAdmin /> },
          { path: "contacts", element: <ContactsAdmin/>}
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
