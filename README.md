# TaskBoard

**TaskBoard** is a modern, responsive task management web app with a React frontend and a Node.js/Express backend. It demonstrates secure authentication, protected routes, and full CRUD functionality on a dashboard.

## Project Overview

TaskBoard allows users to:

- Sign up and log in securely using JWT authentication
- Access a protected dashboard after login
- Create, view, update, and delete tasks
- Search and filter tasks in real time
- Log out securely

This project was built as part of a Frontend Developer Intern assignment with emphasis on frontend engineering, backend integration, security, and scalability.

## Tech Stack

- Frontend: React, React Router DOM, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Features

### Authentication & Security

- User signup & login
- Password hashing using bcrypt
- JWT-based authentication
- Protected dashboard routes
- Secure logout flow

### Dashboard

- Fetch and display logged-in user profile
- CRUD operations on tasks (Create, Read, Update, Delete)
- Search and filter tasks by title
- Responsive, card-based UI

### Frontend UX

- Fully responsive layout (mobile, tablet, desktop)
- Reusable components
- Modal-based task creation & editing
- Client-side validation to prevent empty/whitespace input

## API Endpoints (Summary)

**Auth**

```
POST /api/v1/auth/signup    # Register user
POST /api/v1/auth/login     # Login user
GET  /api/v1/auth/me        # Fetch logged-in user profile (Protected)
```

**Tasks**

```
GET    /api/v1/tasks/getTasks              # Fetch user tasks (Protected)
POST   /api/v1/tasks/create                # Create task (Protected)
PUT    /api/v1/tasks/updateTask/:id        # Update task (Protected)
DELETE /api/v1/tasks/deleteTask/:id        # Delete task (Protected)
```

## Validation Strategy

- Server-side: presence checks, JWT validation middleware, secure password storage with hashing

## Project Structure

```
frontend/
  ├── components/
  ├── pages/
  ├── routes/
  └── App.jsx

backend/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── middlewares/
  └── server.js
```

## Production Improvements (Proposed)

- Centralized Axios instance with interceptors
- Refresh token mechanism for long sessions
- Pagination & lazy loading for large datasets
- Environment-based configs (dev/staging/prod)
- Rate limiting & request throttling
- Backend validation with schema libraries (e.g., Joi or Zod)

## How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ensure MongoDB and environment variables are properly configured (e.g., `MONGO_URI`, `JWT_SECRET`).

## Submission Details

Built as part of a Frontend Developer Intern assignment, demonstrating frontend proficiency, backend integration, authentication, and scalable architecture design.

## Author

Dev Sharma — Frontend / Full Stack Developer (MERN Stack)