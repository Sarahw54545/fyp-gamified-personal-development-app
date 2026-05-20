# Stellara 🌟
### A Gamified Personal Development Platform

Stellara is a full‑stack web application designed to help users build and maintain positive habits through **meaningful gamification**.

Rather than focusing on competition, Stellara encourages **consistency, reflection, and long‑term engagement** using experience points (XP), levels, achievements, and visual progress feedback.

This project was developed as a **Final Year Project (BSc (Hons) Creative Computing)** and follows professional software engineering practices including Agile development, CI/CD, and modular backend architecture.

---

## ✨ Key Features

### ✅ Goal & Habit Management
- Create, edit, delete, and complete personal goals
- Active, completed, and archived goal states
- Real‑time UI updates without page refresh

### ✅ Gamification System
- Experience Points (XP) awarded through achievements
- Dynamic level progression derived from XP
- **Daily achievements** to reinforce consistency
- **Progressive achievements** to reward long‑term engagement
- Backend‑driven, event‑based progression logic

### ✅ Dashboards & Visual Feedback
- Action‑focused daily dashboard
- XP progress bar and level indicators
- Daily achievements and current streak tracking
- Reflective profile view with long‑term statistics

### ✅ Authentication & Security
- Secure JWT‑based authentication
- User‑specific data isolation
- Protected API routes

---

## 🧠 Gamification Philosophy

Stellara’s gamification system is informed by **Self‑Determination Theory** and focuses on:
- **Autonomy** — users set their own goals
- **Competence** — visible progression and mastery
- **Consistency** — daily reinforcement without pressure

Competitive elements such as leaderboards were intentionally excluded to avoid discouraging long‑term engagement.

---

## 🏗️ Architecture Overview

Stellara follows a **client–server architecture** with a clear separation of concerns:

- **Frontend:** Presentation & user interaction  
- **Backend:** Business logic, authentication, and gamification engine  
- **Database:** Persistent storage and progression state  

All gamification rules are evaluated on the **backend**, making the frontend a pure visual renderer and preventing duplicated logic.

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- Express.js
- JSON Web Tokens (JWT)

### Database
- PostgreSQL (hosted via Supabase)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---

## 🚀 Live Deployment

- **Frontend:** https://fyp-gamified-personal-development-a.vercel.app/
- **Backend API:** https://fyp-gamified-personal-development-app.onrender.com/

---

## ⚙️ Getting Started (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL (local or cloud‑hosted)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sarahw54545/fyp-gamified-personal-development-app.git
```
2. Install dependencies:
- **Frontend**
```bash
cd client
npm install
```
- **Backend**
```bash
cd server
npm install
```
4. Configure environment variables
- Create .env files in both /client and /server directories as required.

6. Run the application locally:
- **Frontend**
```bash
npm run dev
```
- **Backend**
```bash
npm run dev
```

---

## 📦 Related Projects

### Gamification Engine Library

The gamification logic used in Stellara is designed as a **modular backend engine** and has been published as a standalone repository for public use.

➡️ **Gamification Engine Repository:** [gamification-engine.js](https://github.com/Sarahw54545/gamification-engine-js/)

📘 **Documentation:** [Github Pages Site](https://sarahw54545.github.io/gamification-engine-js/)

This engine can be reused in other applications that require achievement‑based progression systems.

---

## 📈 Development Methodology

Development followed an **Agile, sprint‑based workflow** with:

- Issue‑driven development using GitHub Issues
- Feature branches and pull requests
- Weekly sprint reviews and iterative refinement
- Continuous Integration & Deployment (CI/CD)

Each sprint delivered a testable, deployable increment of the application.

---

## 👩‍💻 Author

**Sarah Walsh**  
BSc (Hons) Creative Computing  
Final Year Project – 2026  

---

## 📄 License

This project was developed for academic purposes.
