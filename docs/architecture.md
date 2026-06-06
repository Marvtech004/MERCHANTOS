# Merchant OS Architecture

Merchant OS is built as a two-tier SaaS application with a React frontend and a Node.js/Express backend.

## Frontend
- React + Vite + Tailwind CSS
- Client-side routing with React Router
- Axios API client for REST endpoints
- Responsive dashboard and mobile-friendly UI
- Floating AI assistant widget integrated across pages

## Backend
- Express REST API
- PostgreSQL database connection via `pg`
- JWT access and refresh token authentication
- Role-based access support built into user model and auth middleware
- Modular routes, controllers, and middleware for clean architecture

## Database
- PostgreSQL schema for users, roles, products, categories, customers, sales, sale_items, reports, audit_logs
- Indexes for common query paths

## Deployment
- Docker containers for frontend, backend, database, and Nginx reverse proxy
- GitHub Actions pipeline for install, lint, and test
