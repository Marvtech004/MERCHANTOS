# Deployment Guide

## Local development

1. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`

2. Create `.env` in `backend/` from `.env.example`.

3. Run backend:
   - `cd backend && npm run dev`

4. Run frontend:
   - `cd frontend && npm run dev`

## Docker deployment

1. Build and start containers:
   - `docker-compose up --build`

2. Access the application at `http://localhost`.

3. The backend is exposed on `http://localhost:4000` and the frontend is on `http://localhost:3000` through Nginx.

## Continuous integration

The GitHub Actions workflow is configured in `.github/workflows/ci.yml`.
It installs dependencies, lints the frontend and backend, and executes placeholder tests.
