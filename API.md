# API Documentation

This document describes the backend API for TaskBoard (v1). It covers authentication endpoints, task management endpoints, required headers, common responses, and examples to help with testing or submission.

## Base URL

- Local (development): `http://localhost:5000/api/v1`

## Authentication

- The API uses JWT for authentication. Tokens are returned on `signup` and `login` and can be sent either in a cookie (`token`) or in the `Authorization` header as `Bearer <token>`.
- Required header for protected endpoints:

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Error responses

- `400` Bad Request (validation or missing fields)
- `401` Unauthorized (missing/invalid token)
- `404` Not Found (resources not found)
- `500` Server Error

## Common models

**Task (example):**

```json
{
  "_id": "64b8fd...",
  "user": "64b8fa...",
  "title": "Buy groceries",
  "content": "Milk, eggs, bread",
  "createdAt": "2025-12-14T10:00:00.000Z",
  "updatedAt": "2025-12-14T10:10:00.000Z"
}
```

**User (example returned on login/signup):**

```json
{
  "_id": "64b8fa...",
  "firstName": "Dev",
  "lastName": "Sharma",
  "email": "dev@example.com",
  "token": "<jwt-token>"
}
```

## Endpoints

### Auth

#### POST /auth/signup
- Description: Register a new user.
- Body (JSON):

```json
{
  "firstName": "Dev",
  "lastName": "Sharma",
  "email": "dev@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

- Success Response (201):

```json
{
  "success": true,
  "token": "<jwt-token>",
  "user": { /* user object without password */ }
}
```

#### POST /auth/login
- Description: Authenticate a user and return a token.
- Body (JSON):

```json
{
  "email": "dev@example.com",
  "password": "password123"
}
```

- Success Response (200):

```json
{ "success": true, "token": "<jwt-token>", "user": { /* user */ } }
```

#### POST /auth/logout
- Description: Clears cookie/token on server and returns success. Accepts token via header or cookie.
- Success Response (200): `{ "success": true, "message": "User logged out" }`

#### GET /auth/me (Protected)
- Description: Fetch logged-in user profile (requires auth).
- Response (200): `{ "success": true, "user": { /* user */ } }`

### Tasks

#### GET /tasks/getTasks (Protected)
- Description: Fetch tasks for authenticated user. Optional `q` query param to search title/content (case-insensitive).
- Query parameters: `?q=searchTerm`
- Response (200): `{ "success": true, "tasks": [ /* task objects */ ] }`

#### POST /tasks/create (Protected)
- Description: Create a new task.
- Body (JSON):

```json
{ "title": "Buy groceries", "content": "Milk, eggs" }
```
- Response (201): `{ "success": true, "task": { /* created task */ } }`

#### PUT /tasks/updateTask/:id (Protected)
- Description: Update an existing task by ID.
- Body (JSON): `{ "title": "updated title", "content": "updated content" }`
- Response (200): `{ "success": true, "message": "Task updated successfully", "task": { /* updated task */ } }`

#### DELETE /tasks/deleteTask/:id (Protected)
- Description: Delete a task by ID.
- Response (200): `{ "success": true, "message": "Task deleted" }`

## Examples (curl)

# Signup
```
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Dev","lastName":"Sharma","email":"dev@example.com","password":"password","confirmPassword":"password"}'
```

# Login
```
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@example.com","password":"password"}'
```

# Get tasks (with token)
```
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/v1/tasks/getTasks
```

## Notes & Tips

- Use the cookie returned on `signup`/`login` or pass the `Authorization` header for API testing tools.
- Validate requests on the client with `.trim()` to avoid whitespace-only fields.
- Environment variables used by the backend:
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET_KEY` — secret used to sign tokens

If you'd like, I can also generate a small Postman collection or an OpenAPI (Swagger) spec from this doc — want me to add one?
