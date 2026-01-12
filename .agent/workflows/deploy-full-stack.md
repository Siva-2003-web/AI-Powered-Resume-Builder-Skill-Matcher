---
description: Complete deployment guide for Vercel + Render + MongoDB Atlas
---

# 🚀 Complete Deployment Guide (Vercel + Render)

This workflow will guide you through deploying your AI-Powered Resume Builder to production.

**Time Required:** ~30-40 minutes  
**Cost:** $0 (Free tier for all services)

---

## ✅ Pre-Deployment Checklist

Before starting, ensure you have:

- [ ] GitHub account with your code pushed
- [ ] All local changes committed and pushed to GitHub
- [ ] Gemini API key from [ai.google.dev](https://ai.google.dev)
- [ ] Strong JWT secret ready (generate 32+ random characters)

---

## 📋 Deployment Order

**IMPORTANT:** Follow this exact order:

```
1. MongoDB Atlas (Database)  →  Get connection string
2. Render (Backend)          →  Get backend URL
3. Vercel (Frontend)         →  Get frontend URL
4. Update Render CORS        →  Add Vercel URL
5. Test Everything           →  Verify deployment
```

---

## STEP 1: Setup MongoDB Atlas (5-10 minutes)

### 1.1 Create MongoDB Atlas Account

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Click "Try Free" or "Sign In"
3. Create account or sign in with Google/GitHub

### 1.2 Create a New Cluster

1. Click "Build a Database"
2. Choose **M0 FREE** tier
3. You can leave default settings (AWS)
4. Click "Create Cluster"

### 1.3 Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `resumebuilder`
5. Click "Autogenerate Secure Password" - **SAVE THIS PASSWORD**
6. Database User Privileges: **Read and write to any database** (or default)
7. Click "Add User"

### 1.4 Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (`0.0.0.0/0`)
4. Click "Confirm"
5. Wait for status to become "Active"

### 1.5 Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Replace `<database>` with `resumebuilder` (replacing `test` or `default`)

**Example:**

```
mongodb+srv://resumebuilder:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/resumebuilder?retryWrites=true&w=majority
```

**SAVE THIS CONNECTION STRING - You'll need it for Render**

---

## STEP 2: Deploy Backend to Render (10-15 minutes)

### 2.1 Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click "Get Started"
3. Sign in with GitHub (recommended)

### 2.2 Create New Web Service

1. Click "New +" button → Select "Web Service"
2. Select "Build and deploy from a Git repository"
3. Connect your GitHub account if not already connected
4. Find and select your repository: `AI-Powered-Resume-Builder-Skill-Matcher`

### 2.3 Configure Service Settings

Render will ask for configuration details. Fill them exactly as below:

- **Name:** `ai-resume-backend` (or similar)
- **Region:** Choose one close to you (e.g., Oregon, Frankfurt)
- **Branch:** `main` (or your working branch)
- **Root Directory:** `Backend` <-- **CRITICAL STEP!**
- **Runtime:** `Node`
- **Build Command:** `npm install` (default is usually fine)
- **Start Command:** `node src/index.js` (or `npm start`)
- **Instance Type:** `Free`

### 2.4 Add Environment Variables

Scroll down to "Environment Variables" section and click "Add Environment Variable". Add these:

| Key              | Value                                                             |
| ---------------- | ----------------------------------------------------------------- |
| `MONGODB_URI`    | (Your connection string from Step 1)                              |
| `PORT`           | `4000` (Render creates a PORT var automatically, but good to set) |
| `NODE_ENV`       | `production`                                                      |
| `JWT_SECRET`     | (Your strong random string)                                       |
| `GEMINI_API_KEY` | (Your Gemini API Key)                                             |
| `CORS_ORIGINS`   | `http://localhost:5173` (We will update this later)               |
| `FRONTEND_URL`   | `http://localhost:5173` (We will update this later)               |

### 2.5 Deploy Backend

1. Click "Create Web Service"
2. Render will start building and deploying
3. Wait for "Build successful" and "Live" status (3-5 minutes)

### 2.6 Get Render Backend URL

1. At the top left of the service dashboard, find your URL
2. It looks like: `https://ai-resume-backend.onrender.com`
3. Copy this URL

**Note:** The first request to a free Render instance might take 50 seconds to verify (Cold Start).

**SAVE THIS URL - You'll need it for Vercel**

---

## STEP 3: Deploy Frontend to Vercel (10-15 minutes)

### 3.1 Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Login with GitHub

### 3.2 Import Project

1. Click "Add New..." → "Project"
2. Import your repository `AI-Powered-Resume-Builder-Skill-Matcher`

### 3.3 Configure Project

- **Root Directory:** Click Edit and select `Frontend`
- **Framework Preset:** `Vite` (Auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 3.4 Add Environment Variables

Expand "Environment Variables" and add:

| Key             | Value                                                 |
| --------------- | ----------------------------------------------------- |
| `VITE_API_URL`  | `https://your-backend.onrender.com` (Your Render URL) |
| `VITE_APP_NAME` | `AI Resume Builder`                                   |
| `VITE_ENV`      | `production`                                          |

### 3.5 Deploy Frontend

1. Click "Deploy"
2. Wait for the "Congratulations!" screen
3. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## STEP 4: Update Render CORS (5 minutes)

Connect the frontend to the backend security whitelist.

1. Go back to [Render Dashboard](https://render.com)
2. Select your Web Service
3. Go to "Environment" tab
4. Update `CORS_ORIGINS`:
   `http://localhost:5173,https://your-app.vercel.app` (Add your Vercel URL)
5. Update `FRONTEND_URL`:
   `https://your-app.vercel.app`
6. Click "Save Changes"

Render will automatically restart the service to apply changes.

---

## STEP 5: Final Verification

1. Open your Vercel URL
2. Try to:
   - Login/Signup
   - View Dashboard
   - Create a Resume
3. If data loads, you are done!

---

## 🆘 Troubleshooting

**Backend Health Check:**
Visit `https://your-backend.onrender.com/api/resumes/demo` in your browser.

- If it loads JSON, backend is working.
- If it spins forever, Render is waking up (Free tier) or crashed (Check Logs).

**CORS Error in Frontend Console:**

- Make sure Vercel URL in `CORS_ORIGINS` does NOT have a trailing slash (`/`).
- Make sure it starts with `https://`.

**MongoDB Connection Error:**

- Check IP Allowlist in Mongo Atlas is set to `0.0.0.0/0`.
