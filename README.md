# 🚀 AI Resume Builder

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google" alt="Gemini AI" />
</div>

<br />

> **An intelligent, AI-powered resume building platform that helps job seekers create professional, ATS-optimized resumes with smart content suggestions and skill gap analysis.**

---

## ✨ Key Features

### 🤖 AI-Powered Content Generation

- **Smart Summary Generator** - Creates professional summaries based on your job title
- **Experience Bullet Points** - AI-generated work experience descriptions
- **Skill Suggestions** - Intelligent skill recommendations based on your profile
- **Project Descriptions** - Auto-generate compelling project summaries

### 📊 Career Analysis Tools

- **Skill Gap Analysis** - Compare your skills against job requirements
- **Job Role Matcher** - Get compatibility scores for job descriptions
- **Improvement Recommendations** - Actionable suggestions to enhance your profile

### 🎨 Professional Templates

- **Classic Template** - Traditional single-column layout
- **Modern Template** - Two-column design with sidebar
- **Minimal Template** - Clean, elegant typography-focused design

### 📄 Export & Share

- **PDF Download** - High-quality A4 PDF export
- **Real-time Preview** - See changes instantly as you type
- **Shareable Links** - Share your resume with recruiters

---

## 🛠️ Tech Stack

| Layer             | Technologies                                             |
| ----------------- | -------------------------------------------------------- |
| **Frontend**      | React 18, Vite, TailwindCSS, Redux Toolkit, React Router |
| **Backend**       | Node.js, Express.js, JWT Authentication                  |
| **Database**      | MongoDB with Mongoose ODM                                |
| **AI/ML**         | Google Generative AI (Gemini 1.5 Flash)                  |
| **PDF**           | jsPDF, html2canvas                                       |
| **UI Components** | Radix UI, Lucide Icons, Sonner                           |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd Ai-Resume-Builder-main
```

2. **Setup Backend**

```bash
cd Backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/resume-builder
PORT=5001
JWT_SECRET_KEY=your-secret-key
JWT_SECRET_EXPIRES_IN=7d
NODE_ENV=development
ALLOWED_SITE=http://localhost:5173
```

3. **Setup Frontend**

```bash
cd Frontend
npm install
```

Create `.env.local` file:

```env
VITE_GEMENI_API_KEY=your-gemini-api-key
VITE_APP_URL=http://localhost:5001
```

4. **Run the Application**

Terminal 1 (Backend):

```bash
cd Backend
npm start
```

Terminal 2 (Frontend):

```bash
cd Frontend
npm run dev
```

5. **Open in Browser**

```
http://localhost:5173
```

---

## 📁 Project Structure

```
Ai-Resume-Builder-main/
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   └── index.js        # Entry point
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── Services/       # API & AI services
│   │   ├── features/       # Redux slices
│   │   ├── store/          # Redux store
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🎯 Core Workflows

### Resume Creation Flow

1. User signs up / logs in
2. Creates new resume with title
3. Fills personal details, summary, experience, education, skills, projects
4. AI assists with content generation at each step
5. Selects preferred template
6. Previews and downloads as PDF

### Skill Gap Analysis Flow

1. User selects a resume
2. Pastes target job description
3. AI analyzes and compares skills
4. Shows matching skills, missing skills, and match percentage
5. Provides improvement recommendations

---

## 🔐 API Endpoints

| Method | Endpoint                    | Description       |
| ------ | --------------------------- | ----------------- |
| POST   | `/api/v1/user/register`     | User registration |
| POST   | `/api/v1/user/login`        | User login        |
| GET    | `/api/v1/user/start`        | Get current user  |
| POST   | `/api/v1/user/logout`       | User logout       |
| GET    | `/api/v1/resume/getAll`     | Get all resumes   |
| POST   | `/api/v1/resume/create`     | Create resume     |
| PUT    | `/api/v1/resume/update/:id` | Update resume     |
| DELETE | `/api/v1/resume/delete/:id` | Delete resume     |

---

## 🎨 UI/UX Features

- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Glassmorphism** - Modern frosted glass effects
- **Smooth Animations** - Polished transitions and micro-interactions
- **Toast Notifications** - Real-time feedback for user actions

---

## 📝 License

This project is licensed under the MIT License.
