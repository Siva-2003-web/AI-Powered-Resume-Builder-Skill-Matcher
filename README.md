# 🎯 AI-Powered Resume Builder & Skill Matcher

A modern, full-stack web application that helps users create professional resumes with AI-powered features including skill gap analysis and job matching.

![Status](https://img.shields.io/badge/status-production-success)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ **Features**

### **Resume Builder**

- 📝 **5 Professional Templates** - Classic, Modern, Minimal, Executive, Creative
- 🎨 **Customizable Themes** - Multiple color schemes
- 📱 **Responsive Design** - Works on all devices
- 💾 **Auto-save** - Never lose your work
- 📥 **PDF Download** - Export professional PDFs

### **AI-Powered Tools**

- 🤖 **Skill Gap Analysis** - Identify missing skills for target roles
- 🎯 **Job Matcher** - Match your resume to job descriptions
- 💡 **AI Suggestions** - Powered by Google Gemini AI

### **Demo Resumes**

- 🌟 **5 Sample Resumes** - See different template designs
- 👀 **Read-only Examples** - Professional content to inspire
- 🚀 **Quick Start** - Understand the platform instantly

---

## 🏗️ **Tech Stack**

### **Frontend**

- ⚛️ React 18
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔄 Redux Toolkit
- 🛣️ React Router
- 📝 React Hook Form

### **Backend**

- 🟢 Node.js
- 🚂 Express.js
- 🗄️ MongoDB + Mongoose
- 🔐 JWT Authentication
- 🍪 Cookie Parser
- 🤖 Google Gemini AI

### **Deployment**

- 🌐 **Frontend:** Vercel
- 🚂 **Backend:** Railway
- 🗄️ **Database:** MongoDB Atlas

---

## 📦 **Project Structure**

```
AI-Powered-Resume-Builder/
├── Frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── features/        # Redux slices
│   │   ├── Services/        # API services
│   │   └── data/            # Static data (templates)
│   ├── .env.example         # Environment variables template
│   └── vercel.json          # Vercel configuration
│
├── Backend/                  # Express.js backend
│   ├── src/
│   │   ├── controller/      # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── data/            # Demo data
│   │   └── db/              # Database connection
│   ├── .env.example         # Environment variables template
│   └── railway.json         # Railway configuration
│
├── DEPLOYMENT_GUIDE.md      # Detailed deployment guide
├── QUICK_DEPLOY.md          # Quick reference
└── PRE_DEPLOYMENT_CHECKLIST.md
```

---

## 🚀 **Quick Start (Local Development)**

### **Prerequisites**

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Gemini API key

### **1. Clone Repository**

```bash
git clone <your-repo-url>
cd AI-Powered-Resume-Builder
```

### **2. Setup Backend**

```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

### **3. Setup Frontend**

```bash
cd Frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

### **4. Open Browser**

```
Frontend: http://localhost:5173
Backend: http://localhost:5001
```

---

## 🌐 **Deployment**

### **Quick Deploy (30 minutes)**

See detailed guides:

- 📖 **Full Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- ⚡ **Quick Reference:** [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
- ✅ **Checklist:** [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)

### **Deployment Stack:**

```
MongoDB Atlas (Database) → Free 512MB
Railway (Backend)        → $5 credit/month
Vercel (Frontend)        → Free unlimited
```

**Total Cost:** $0/month (within free tiers)

---

## 🔐 **Environment Variables**

### **Backend (.env)**

```env
MONGODB_URI=mongodb+srv://...
PORT=5001
NODE_ENV=development
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-api-key
CORS_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

### **Frontend (.env)**

```env
VITE_API_URL=http://localhost:5001
VITE_APP_NAME=AI Resume Builder
VITE_ENV=development
```

---

## 📚 **API Documentation**

### **Authentication**

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user

### **Resumes**

- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `GET /api/resumes/demo` - Get demo resumes (public)

---

## 🎨 **Resume Templates**

1. **Classic** - Traditional single-column layout
2. **Modern** - Two-column with sidebar
3. **Minimal** - Clean and elegant design
4. **Executive** - Bold, professional, uppercase headers
5. **Creative** - Colorful header, timeline design

Each template supports:

- Custom theme colors
- All resume sections
- PDF export
- Responsive design

---

## 🤖 **AI Features**

### **Skill Gap Analysis**

- Analyzes your resume against target job role
- Identifies missing skills
- Provides actionable recommendations
- Powered by Google Gemini AI

### **Job Matcher**

- Compares resume to job description
- Calculates match percentage
- Highlights strengths and gaps
- Suggests improvements

---

## 🧪 **Testing**

### **Run Tests Locally**

```bash
# Frontend
cd Frontend
npm run build    # Test production build
npm run preview  # Preview production build

# Backend
cd Backend
npm start        # Test server
```

### **Test Checklist**

- [ ] User registration/login
- [ ] Resume CRUD operations
- [ ] Template selection
- [ ] PDF download
- [ ] AI features
- [ ] Demo resumes

---

## 📊 **Performance**

- ⚡ **Fast Load Times** - Optimized builds
- 🌍 **Global CDN** - Vercel edge network
- 💾 **Efficient Caching** - Smart cache strategies
- 📱 **Mobile Optimized** - Responsive design

---

## 🔒 **Security**

- 🔐 JWT authentication
- 🍪 HTTP-only cookies
- 🛡️ CORS protection
- 🔒 Environment variables
- 🚫 Input validation
- 🔑 Password hashing

---

## 🤝 **Contributing**

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📝 **License**

MIT License - feel free to use for personal or commercial projects.

---

## 🆘 **Support**

- 📖 **Documentation:** See deployment guides
- 🐛 **Issues:** Open GitHub issue
- 💬 **Questions:** Check documentation first

---

## 🎯 **Roadmap**

- [ ] More resume templates
- [ ] Cover letter generator
- [ ] LinkedIn profile import
- [ ] Resume analytics
- [ ] Team collaboration
- [ ] ATS optimization checker

---

## 👏 **Acknowledgments**

- Google Gemini AI for AI features
- Vercel for frontend hosting
- Railway for backend hosting
- MongoDB Atlas for database
- Shadcn UI for components
- Lucide for icons
