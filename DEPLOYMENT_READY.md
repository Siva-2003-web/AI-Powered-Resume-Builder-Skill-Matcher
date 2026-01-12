# 🎉 Project Ready for Deployment!

Your AI-Powered Resume Builder is prepared for **Vercel + Render + MongoDB Atlas**.

---

## 🚀 Quick Deployment Steps

### 1. Database (MongoDB Atlas)

- Create Cluster & User
- Allow IP `0.0.0.0/0`
- **Get Connection String**

### 2. Backend (Render)

- New Web Service -> Connect GitHub
- **Root Directory:** `Backend`
- **Build:** `npm install`
- **Start:** `node src/index.js`
- **Env Vars:**
  - `MONGODB_URI`: (Your Connection String)
  - `JWT_SECRET`: (Random String)
  - `GEMINI_API_KEY`: (Your Google Key)
  - `PORT`: `4000`
- **Get Backend URL**

### 3. Frontend (Vercel)

- New Project -> Import GitHub
- **Root Directory:** `Frontend`
- **Framework:** Vite
- **Env Vars:**
  - `VITE_API_URL`: (Your Render Backend URL)
- **Get Frontend URL**

### 4. Connect

- Update Render Env Var `CORS_ORIGINS` with Vercel Frontend URL.

---

## 📄 Detailed Guide

See `.agent/workflows/deploy-full-stack.md` for full screenshot-style instructions.
