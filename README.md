# Grad-Loop

<div align="center">

**A unified platform to help students and graduates build, analyze, and continuously improve their professional profiles.**  
Resume creation + analysis, profile recommendations, authentication, and database‑backed persistence — all in one loop.

<br />

<!-- Stack / Tech badges -->

[![Next.js](https://img.shields.io/badge/Next.js-App-000000?logo=nextdotjs&logoColor=white)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-Primary-3178C6?logo=typescript&logoColor=white)](#tech-stack)
[![Python](https://img.shields.io/badge/Python-Analysis%20Services-3776AB?logo=python&logoColor=white)](#tech-stack)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](#database)
[![CSS](https://img.shields.io/badge/CSS-Styling-1572B6?logo=css3&logoColor=white)](#tech-stack)

<!-- Language composition badges (as reported) -->

[![TypeScript %](https://img.shields.io/badge/TypeScript-67.3%25-3178C6?logo=typescript&logoColor=white)](#tech-stack)
[![Python %](https://img.shields.io/badge/Python-28.7%25-3776AB?logo=python&logoColor=white)](#tech-stack)
[![JavaScript %](https://img.shields.io/badge/JavaScript-2.6%25-F7DF1E?logo=javascript&logoColor=000)](#tech-stack)
[![CSS %](https://img.shields.io/badge/CSS-1.1%25-1572B6?logo=css3&logoColor=white)](#tech-stack)
[![PL%2FpgSQL %](https://img.shields.io/badge/PL%2FpgSQL-0.3%25-4169E1?logo=postgresql&logoColor=white)](#database)

<br />

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Python Components](#python-components)
- [Scripts](#scripts)
- [Team Contributions](#team-contributions)
- [Contributing](#contributing)

---

## Overview

Grad-Loop is a full‑stack application focused on improving career readiness. It helps users iteratively:

1. **Create** a resume
2. **Analyze** it for feedback and quality signals
3. **Act** on recommendations to improve their profile
4. **Repeat** — continuously refining outcomes

---

## Key Features

- **User Authentication**
  - Sign up / Sign in
  - Protected, user-specific workflows

- **Resume Creator**
  - Guided, interactive resume builder
  - Export-ready resume generation

- **Resume Analyzer**
  - Automated analysis and feedback
  - Suggestions to improve structure and content

- **Profile Recommendations**
  - Personalized, actionable improvements

- **Database-backed Data Management**
  - Store and retrieve resumes, profiles, and user-related data

- **Backend APIs / Services**
  - Endpoints for frontend integration
  - Business logic + data access layer

---

## Tech Stack

### Frontend

- **Next.js** — UI, routing, and server-side capabilities
- **TypeScript** — type-safe, maintainable development
- **CSS** — styling

### Backend

- Backend services/APIs for user/resume data, business logic, and DB communication

### Python Components

- Python modules/services for resume analysis, parsing, scoring, and related workflows

---

## Repository Structure

> The exact structure may vary; use this as a guide.

- `app/` or `pages/` — routes and UI (Next.js)
- `src/` — shared application logic/components
- `api/` / `server/` — backend services
- `scripts/` — automation and utilities
- `db/` / `migrations/` — database schema and migrations

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm / yarn / pnpm / bun**
- **Python 3.10+** (recommended)
- A running **database** instance (as required by the backend)

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

### 3) Run the development server

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

---

## Environment Variables

Create a `.env` file (or `.env.local` depending on project conventions) and set values such as:

- Authentication secrets/keys
- Database connection string
- Backend API URLs

> If the repo includes a `.env.example`, copy it to `.env` and fill in the values.

---

## Database

This project uses a database for persisting user profiles, resumes, and related data.

- Ensure your DB is running
- Confirm your connection string is set (e.g., `DATABASE_URL=...`)
- Apply migrations if your setup requires them

> Migration tooling varies by stack (Prisma, Knex, Django/Alembic, etc.). Check the repo for a migrations folder or package scripts.

---

## Python Components

If you are running the resume analysis service/utilities:

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

pip install -r requirements.txt
python main.py
```

---

## Scripts

Common scripts you may find in `package.json`:

- `dev` — start the development server
- `build` — create a production build
- `start` — start the production server
- `lint` — lint code
- `test` — run tests

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
2. Create a new branch: `feature/your-feature-name`
3. Commit your changes
4. Open a Pull Request

Please ensure your code follows existing conventions.
