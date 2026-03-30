# News Portal

A full-stack News Portal application with a Spring Boot backend and a React + Vite frontend.

## Overview

This project allows users to:
- Register and log in using JWT authentication
- Create, edit, and delete news posts (authorized users)
- View all news posts and post details
- Add comments to news posts
- Browse users

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.4
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Gradle

### Frontend
- React 19
- Vite
- React Router
- Axios

## Project Structure

- backend/: Spring Boot REST API
- frontend/: React client app

## Prerequisites

Install these before running the project:
- Java 21+
- Node.js 18+ and npm
- PostgreSQL

## Quick Start

### 1) Configure database and backend settings

Open backend/src/main/resources/application.properties and verify/update:
- spring.datasource.url
- spring.datasource.username
- spring.datasource.password
- jwt.secret

Default backend port is 8080.

### 2) Run backend

From the backend folder:

Windows:
./gradlew.bat bootRun

macOS/Linux:
./gradlew bootRun

Backend will run at:
http://localhost:8080

### 3) Run frontend

From the frontend folder:

npm install
npm run dev

Frontend will run at (Vite default):
http://localhost:5173

## Frontend to Backend Connection

In development, the frontend uses /api as a base path and Vite proxies requests to:
http://localhost:8080

So frontend requests like /api/news are forwarded to backend /news.

## Main API Endpoints

Authentication:
- POST /auth/register
- POST /auth/login

Users:
- GET /users
- GET /users/{id}

News:
- GET /news
- GET /news/{id}
- POST /news
- PATCH /news/{id}
- DELETE /news/{id}
- POST /news/{id}/comments

For protected routes, include:
Authorization: Bearer <token>

## Scripts

### Frontend
- npm run dev: Start dev server
- npm run build: Build for production
- npm run preview: Preview production build
- npm run lint: Run ESLint

### Backend
- ./gradlew.bat bootRun (Windows): Start server
- ./gradlew test: Run tests
- ./gradlew build: Build project

## Notes

- Keep sensitive values (database password, JWT secret) out of version control.
- If the frontend cannot reach backend, ensure backend is running on port 8080.
- If PostgreSQL connection fails, verify credentials and database name in backend configuration.

## Existing Module READMEs

For module-specific details, see:
- backend/README.md
- frontend/README.md
