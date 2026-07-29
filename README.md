# AI Prompt Library

A full-stack application for saving, organising, searching, and reusing AI prompts. It provides a responsive prompt workspace with dark mode, favourites, pinned prompts, drag-and-drop ordering, and JSON import/export.

## Tech stack

- **Frontend:** React, TypeScript, Vite, React Router, React Hook Form, Zod, Axios, dnd-kit, and Lucide icons
- **Backend:** Node.js, Express, TypeScript, Mongoose, and CORS
- **Database:** MongoDB

## Features

- Create, edit, delete, and duplicate prompts
- Categorise prompts and add tags, favourites, and pinned status
- Search, filter by category/favourites, and sort the library
- Dashboard with prompt statistics and recently updated prompts
- Drag-and-drop prompt ordering in the library
- Light and dark themes
- Import and export prompts as JSON

## Project architecture

```text
Browser
  |
  v
React + Vite frontend (frontend/)
  |- App.tsx                  Routes and application shell
  |- pages/                   Dashboard and prompt-library screens
  |- components/              Layout, prompt UI, and modal components
  |- context/                 Shared prompt and theme state
  |- hooks/                   Context access and UI helpers
  |- services/                Axios client and API calls
  |- schemas/                 Zod form validation
  `- types/                   Shared frontend TypeScript types
  |
  | HTTP requests (VITE_API_URL)
  v
Express API (backend/)
  |- server.ts                Environment setup, database connection, server start
  |- app.ts                   Middleware and /api/prompts route registration
  |- routes/                  HTTP endpoint definitions
  |- controllers/             Request handling, search, filtering, and import/export
  |- models/                  Mongoose Prompt schema
  `- config/                  MongoDB connection
  |
  v
MongoDB
  `- prompts collection
```

### Request flow

1. A page or component calls a function in `frontend/src/services/prompt.service.ts`.
2. Axios sends the request to the Express API using `VITE_API_URL`.
3. The `/api/prompts` router forwards the request to its controller.
4. The controller validates/processes the data through the Mongoose `Prompt` model.
5. MongoDB returns data, which flows back through the service into `PromptContext` and the UI.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/prompts` | List prompts; supports `search`, `category`, `favorite`, and `sort` query parameters |
| `POST` | `/api/prompts` | Create a prompt |
| `GET` | `/api/prompts/export` | Export all prompts as JSON |
| `POST` | `/api/prompts/import` | Import an array of prompts |
| `GET` | `/api/prompts/:id` | Get one prompt |
| `PUT` | `/api/prompts/:id` | Update a prompt |
| `DELETE` | `/api/prompts/:id` | Delete a prompt |
| `POST` | `/api/prompts/:id/duplicate` | Create a copy of a prompt |

## Getting started

### Prerequisites

- Node.js 20 or later
- A MongoDB database (local or Atlas)

### 1. Configure environment variables

Create or update these files; do not commit real credentials.

`backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

`frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

## Available scripts

| Directory | Command | Description |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Type-check and create a production build |
| `frontend` | `npm run lint` | Run ESLint |
| `backend` | `npm run dev` | Start the API with automatic reload |
| `backend` | `npm run build` | Compile TypeScript to `dist/` |
| `backend` | `npm start` | Run the compiled API |
