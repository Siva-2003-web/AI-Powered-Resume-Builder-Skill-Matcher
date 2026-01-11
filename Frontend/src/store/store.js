/**
 * ============================================================
 * SKILLFORGE RESUME BUILDER
 * ============================================================
 * 
 * @author      [Your Name / Team Name]
 * @version     2.0.0
 * @description AI-powered resume building platform with smart
 *              content generation and career analysis tools
 * 
 * @features
 * - Intelligent AI content generation (Google Gemini)
 * - Multiple professional resume templates
 * - Skill gap analysis and job matching
 * - Real-time preview with PDF export
 * 
 * @copyright   2024-2026 SkillForge Team
 * @license     MIT
 * ============================================================
 */

import { configureStore } from "@reduxjs/toolkit";
import resumeSlice from "../features/resume/resumeFeatures";
import userSlice from "../features/user/userFeatures";

/**
 * Global Redux Store Configuration
 * 
 * Manages application-wide state including:
 * - Resume data (editResume)
 * - User authentication (editUser)
 * 
 * @author [Your Name]
 */
export const appStore = configureStore({
  reducer: {
    editResume: resumeSlice,
    editUser: userSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Legacy export for backward compatibility
export const resumeStore = appStore;

export default appStore;
