# Gamified Personal Development App - Final Year Project

## :memo: Description

A full-stack web application designed to help users build and maintain positive habits through gamification techniques such as XP, levels, and achievements.

This project is being developed as part of a Final Year Project and follows an iterative, Agile-based development approach.

---

## :jigsaw: Features
_Current (POC 1):_
- Full-stack "Hello World" proof of concept
- React frontend fetching data from backend API
- Express.js backend serving REST API endpoints
- PostgreSQL database connection and test query

_Planned:_
- Habit and goal creation
- Gamified progression system (XP, levels, achievements)
- User authentication and personalisation
- Progress tracking dashboards and statistics

---

## :hammer_and_wrench: Tech Stack
- **Frontend:** React.js (Vite)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Hosting:** Vercel (Frontend), Render (Backend)


---

## :rocket: Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (local or cloud-based)

### Setup
1. Clone the repo
```bash
git clone https://github.com/<your-username>/gamified-personal-development-app.git
````

2. Install npm packages
    2.1 Frontend
    ```bash
    cd client
    npm install
    ````
    2.2 Backend
    ```bash
    cd server
    npm install
    ````

3. Configure Environment Variables
Create .env files in both /server and /client as required

4. Run the Application Locally
    2.1 Frontend
    ```bash
    cd client
    npm run dev
    ````
    2.2 Backend
    ```bash
    cd server
    npm run dev
    ````