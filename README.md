## samdigitalx.com – Monorepo

This repository contains the source code for the **samdigitalx.com** portfolio site and its admin dashboard, plus the backend API that powers them.

- **Frontend** (`samdigitalx`): React + Vite + React Router + Tailwind CSS, with an admin dashboard for managing portfolio content.
- **Backend** (`server`): Node.js + Express + MongoDB (via Mongoose), with JWT-based auth, file uploads (Multer + Cloudinary), and REST APIs for portfolio data and testimonials.

---

## Project Structure

- `samdigitalx` – React/Vite frontend (public site + admin dashboard UI)
- `server` – Express API server (auth, portfolio, testimonials, admin operations)
- `.gitignore` – Root git ignore rules

Each app is versioned and installed independently.

---

## Tech Stack

- **Frontend**
  - React 19 + React DOM
  - Vite
  - React Router
  - Tailwind CSS
  - Shadcn UI, Radix UI primitives
  - Axios, EmailJS, Swiper, Lucide, Heroicons

- **Backend**
  - Node.js + Express
  - MongoDB + Mongoose
  - JWT (authentication)
  - Bcrypt
  - Multer + Cloudinary (file storage)
  - CORS, dotenv, nodemon

---

## Prerequisites

- **Node.js** (LTS recommended)
- **pnpm** (preferred, as indicated by lockfiles)
- A running **MongoDB** instance (local or hosted)
- A **Cloudinary** account (for media uploads)

---

## Backend Setup (`server`)

1. Change into the backend folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in `server` with at least:

   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   PORT=5000
   ```

4. Start the backend in development mode:

   ```bash
   pnpm run dev
   ```

   By default the server listens on `http://localhost:5000` (or the `PORT` you configure).

---

## Frontend Setup (`samdigitalx`)

1. Change into the frontend folder:

   ```bash
   cd samdigitalx
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Ensure the API base URL in `src/service/api.js` points to your running backend (e.g. `http://localhost:5000`).

4. Start the frontend dev server:

   ```bash
   pnpm run dev
   ```

   Vite will print the local URL (usually `http://localhost:5173`).

---

## Scripts Overview

- **Frontend (`samdigitalx/package.json`)**
  - `pnpm run dev` – Start Vite dev server
  - `pnpm run build` – Create production build
  - `pnpm run preview` – Preview built app locally
  - `pnpm run lint` – Run ESLint

- **Backend (`server/package.json`)**
  - `pnpm run dev` – Start Express server with nodemon

---

## Deployment Notes

- Frontend is configured as a standard **Vite React** app (see `samdigitalx/vite.config.js` and `vercel.json`) and can be deployed to platforms like Vercel or Netlify.
- Backend is a standalone **Express** service and can be deployed to any Node-friendly host (Render, Railway, VPS, etc.) with access to MongoDB and Cloudinary credentials.

Make sure the frontend’s API base URL is updated to your production backend URL when deploying.
