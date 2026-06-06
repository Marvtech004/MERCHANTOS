# Merchant OS

Merchant OS is a cloud-native SaaS business management platform for retailers, merchants, supermarkets, pharmacies, wholesalers, and SMEs.

## Features

- Authentication with roles: `Super Admin`, `Admin`, `Manager`, `Cashier`
- Responsive dashboard, inventory, POS, customers, reports
- AI assistant widget for business insights
- REST API backend with JWT and refresh tokens
- PostgreSQL schema designed for business operations
- Docker + Nginx deployment and GitHub Actions CI

## Structure

- `frontend/` - React + Vite + Tailwind UI
- `backend/` - Node + Express REST API
- `database/` - SQL schema and indexes
- `docker/` - build files and nginx config
- `.github/workflows/` - CI pipeline

## Getting Started

1. Install dependencies for frontend and backend.
   - `cd backend && npm install`
   - `cd frontend && npm install`

2. Create a `.env` file in `backend/` from `.env.example`.

3. Start services locally:
   - `docker-compose up --build`

4. Open `http://localhost` for the frontend.

## Local Development

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Deployment

The project includes Dockerfiles for containerized deployment and an Nginx reverse proxy configuration.

## AI Assistant

The AI assistant is available as a floating widget on every frontend page and uses a backend endpoint for business questions.
