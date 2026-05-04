# Grad-Loop

A unified platform designed to help graduates and students build, analyze, and improve their professional profiles. **Grad-Loop** brings together resume creation + analysis, profile recommendations, authentication, and a backend-powered data layer into one cohesive web application.

---

## Project Overview
Grad-Loop is a full‑stack application focused on guiding users through improving their career readiness. The platform enables users to:
- Create resumes using an interactive builder
- Analyze resumes and get feedback/insights
- Receive profile recommendations to improve employability
- Manage accounts securely with authentication
- Store and retrieve user/resume data via a database-backed backend

The repository contains both **TypeScript/JavaScript** (web application) and **Python** (analysis/processing services or utilities), reflecting a hybrid architecture that supports resume insights alongside a modern web UI.

---

## Tech Stack (Detailed)
### Frontend
- **Next.js**: Core web framework for UI, routing, and server-side capabilities
- **TypeScript**: Strongly typed development for reliability and maintainability
- **CSS**: Styling

### Authentication
- Authentication layer for user sign‑up/sign‑in and protected routes/pages

### Backend
- Backend services/APIs to handle:
  - user and resume data handling
  - business logic
  - communication with the database

### Database
- Persistent storage for user profiles, resumes, and related application data

### Python Components
- Python modules/services used for resume analysis, parsing, scoring, or related workflows

---

## Features & Functionality
- **User Authentication**
  - Sign up / Sign in
  - Protected user-specific workflows

- **Resume Creator**
  - Guided resume builder
  - Export-ready resume generation

- **Resume Analyzer**
  - Automated analysis and feedback
  - Suggestions to improve resume quality and structure

- **Profile Recommendations**
  - Personalized recommendations to enhance user profiles
  - Actionable tips to improve career readiness

- **Database-backed Data Management**
  - Store and retrieve resumes, profiles, and user-related data

- **Backend APIs / Services**
  - Endpoints for frontend integration
  - Business logic + data access layer

---

## Setup & Run

### Prerequisites
- **Node.js** (LTS recommended)
- **npm** / **yarn** / **pnpm** / **bun**
- **Python 3.10+** (recommended)
- A running database instance (as required by the backend)

### 1) Clone the repository
```bash
git clone https://github.com/Aryan9059/grad-loop.git
cd grad-loop
```

### 2) Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### 3) Configure environment variables
Create a `.env` file (or `.env.local` depending on project conventions) and add required values such as:
- Authentication secrets/keys
- Database connection string
- Backend API URLs

> If the repo includes a `.env.example`, copy it to `.env` and fill in the values.

### 4) Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` in your browser.

### 5) (Optional) Setup & run Python components
If you’re running the resume analysis service/utilities:
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

pip install -r requirements.txt
python main.py
```

### 6) Backend & Database
Start the backend service and database according to the instructions in the backend folder (if present). Ensure your database connection string is correctly configured in the environment variables.

---

## Team Contributions
- **Paras Pandey (IIT2024235)** — Profile Recommendations
- **Chandan Sapkale (IIT2024258)** — Frontend + Authentication
- **Soham Donode (IIT2024259)** — Frontend + Database
- **Aryan Srivastava (IIT2024501)** — Resume Creator & Analyzer
- **Rehan Farishta (IIT2024267)** — Backend

---

## Contributing
1. Fork the repository
2. Create a new branch (`feature/your-feature-name`)
3. Commit your changes
4. Open a Pull Request

Please ensure your code follows existing conventions.
