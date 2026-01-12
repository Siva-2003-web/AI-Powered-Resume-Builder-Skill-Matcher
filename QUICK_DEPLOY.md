# 🚀 Quick Deploy Reference (Render Edition)

## URLs to Save

- **MongoDB:** ******\_****** (Connection String)
- **Render:** ******\_****** (Backend URL)
- **Vercel:** ******\_****** (Frontend URL)

## Backend (Render) Settings

- **Root Directory:** `Backend`
- **Language:** Node
- **Build Command:** `npm install`
- **Start Command:** `node src/index.js`

## Frontend (Vercel) Settings

- **Root Directory:** `Frontend`
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output:** `dist`

## Environment Variables Mapping

| Service    | Variable       | Value                               |
| ---------- | -------------- | ----------------------------------- |
| **Render** | `MONGODB_URI`  | `mongodb+srv://...`                 |
| **Render** | `JWT_SECRET`   | `(random string)`                   |
| **Render** | `CORS_ORIGINS` | `https://your-frontend.vercel.app`  |
| **Vercel** | `VITE_API_URL` | `https://your-backend.onrender.com` |

Checking Documents:

- [x] Backend/package.json (Present)
- [x] Backend/src/index.js (Present)
- [x] Frontend/vercel.json (Present)
- [x] frontend/.env.example (Updated)
