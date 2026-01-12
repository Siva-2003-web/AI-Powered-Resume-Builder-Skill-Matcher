/**
 * SkillForge Resume Builder - Application Entry Point
 * 
 * @author      [Your Name / Team Name]
 * @version     2.0.0
 * @description Main entry point that bootstraps the React application
 * 
 * This file configures:
 * - React Router for client-side navigation
 * - Redux Provider for global state management
 * - All application route definitions
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { EditResume } from "./pages/dashboard/edit-resume/[resume_id]/EditResume.jsx";
import ViewResume from "./pages/dashboard/view-resume/[resume_id]/ViewResume.jsx";
import AuthPage from "./pages/auth/customAuth/AuthPage.jsx";
import AboutPage from "./pages/about/AboutPage.jsx";
import { resumeStore } from "./store/store";
import { Provider } from "react-redux";
import SkillGapAnalysis from "./pages/dashboard/skill-gap/SkillGapAnalysis.jsx";
import JobMatcher from "./pages/dashboard/job-matcher/JobMatcher.jsx";
import ResumeAnalysis from "./pages/dashboard/resume-analysis/ResumeAnalysis.jsx";
import DemoPage from "./pages/demo/DemoPage.jsx";

/**
 * Application Route Configuration
 * 
 * Routes are organized into:
 * - Protected routes (requires authentication) - wrapped with App
 * - Public routes (accessible without login)
 * 
 * @author [Your Name]
 */
const appRouter = createBrowserRouter([
  {
    // Protected routes - wrapped with App component for auth checking
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/edit-resume/:resume_id",
        element: <EditResume />,
      },
      {
        path: "/dashboard/view-resume/:resume_id",
        element: <ViewResume />,
      },
      {
        path: "/dashboard/skill-gap",
        element: <SkillGapAnalysis />,
      },
      {
        path: "/dashboard/job-matcher",
        element: <JobMatcher />,
      },
      {
        path: "/dashboard/resume-analysis",
        element: <ResumeAnalysis />,
      },
    ],
  },
  {
    // Public routes
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/demo",
    element: <DemoPage />,
  },
  {
    path: "/auth/sign-in",
    element: <AuthPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

/**
 * Mount the application to the DOM
 * Wrapped with Redux Provider for global state management
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={resumeStore}>
    <React.StrictMode>
      <RouterProvider router={appRouter} />
    </React.StrictMode>
  </Provider>
);
