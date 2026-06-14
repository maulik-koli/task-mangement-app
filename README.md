# Task Management Application

A modern full-stack task management application built as part of a Full-Stack Developer assessment. The application enables authenticated users to create, organize, search, filter, sort, and manage their personal tasks through a responsive and intuitive interface.

## Live Demo

* **Frontend:** [https://taskmangement.maulikkoli.dev](https://taskmangement.maulikkoli.dev)
* **Backend:** [https://api-taskmangement.maulikkoli.dev](https://api-taskmangement.maulikkoli.dev)


## Features

### Authentication

* User registration
* User login
* JWT authentication using Access & Refresh Tokens
* HTTP-only cookie based authentication
* Protected routes
* Persistent authentication across page refreshes

### Task Management

* Create new tasks
* Update existing tasks
* Delete tasks
* View task details
* Mark tasks as completed

### Search, Filter & Sort

* Search tasks by title
* Filter tasks by status
* Sort by priority
* Sort by due date
* Sort by creation date
* Pagination support
* Combined search, filter, sort, and pagination

### User Experience

* Responsive design
* Dark mode
* Optimistic UI updates
* Client-side validation
* Loading states
* Empty states
* Error handling
* Toast notifications

### DevOps

* Dockerized backend
* Docker Compose support
* GitHub Actions CI/CD
* GitHub Container Registry (GHCR)
* Automatic deployment to Render
* Frontend deployment on Vercel


## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod Validation
* Vitest

### Database

* PostgreSQL (Supabase)

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* GitHub Container Registry (GHCR)
* Render
* Vercel


## Project Structure

```text
task-management-app/
├── client/                 # Next.js frontend
├── server/                 # Express backend
├── .github/
│   └── workflows/          # GitHub Actions workflow
└── README.md
```
## Getting Started

### Clone the Repository

```bash
git clone https://github.com/maulik-koli/task-mangement-app
cd task-mangement-app
```

### Configure Environment Variables

Create `.env` files for both the client and server using the provided `.env.example` files.

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### Option 1: Local Development

#### Database

Configure the `DATABASE_URL` in `server/.env` using either:

* A local PostgreSQL instance
* A Supabase PostgreSQL database

#### Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

### Option 2: Docker

Configure the `DATABASE_URL` in `server/.env`, then run:

```bash
cd server
docker compose up --build
```

Run the frontend separately:

```bash
cd client
npm install
npm run dev
```

## Deployment

### Frontend

The frontend is deployed on **Vercel**.

### Backend

The backend is containerized using Docker. Each release is published as a Docker image to GitHub Container Registry (GHCR).

```text
ghcr.io/maulik-koli/task-api-image:latest
```

The Render service is configured to pull and deploy the latest image from GHCR.


## CI/CD

The project uses GitHub Actions to automate backend deployments.

```text
Push to main
      ↓
Build Docker Image
      ↓
Push Image to GHCR
      ↓
Trigger Render Deploy Hook
      ↓
Render Pulls Latest Image
      ↓
Deploy Updated Backend
```

Every push to the `main` branch automatically builds a new Docker image, publishes it to GitHub Container Registry, and triggers a deployment on Render. The backend container applies any pending Prisma migrations during startup before launching the application.
