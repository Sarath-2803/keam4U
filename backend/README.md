# Keam4U Backend

Express + TypeScript backend for the Keam4U platform. The service exposes question lookup APIs, a report endpoint for issue submissions, and a health check route. It uses MongoDB for data storage, Redis for caching, and Winston/Morgan for logging.

## Tech Stack

- Node.js + TypeScript
- Express
- MongoDB / Mongoose
- Redis
- Winston, Morgan
- Nodemailer
- Zod

## Project Structure

- `src/app.ts` - Express app setup and route mounting
- `src/server.ts` - Application bootstrap, DB and Redis connection
- `src/config/` - Database, Redis, logging, and environment helpers
- `src/modules/questions/` - Question domain module
- `src/utils/report.ts` - Issue reporting email endpoint

## Requirements

- Node.js 18+ recommended
- npm
- MongoDB connection string
- Redis password and host access
- Gmail address and app password for the report endpoint

## Environment Variables

Create a `.env` file in `keam4u_backend/` using `.env.example` as a guide.

Required by the backend:

- `PORT`
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `REDIS_PASSWORD`
- `REPORT_EMAIL`
- `REPORT_EMAIL_PASSWORD`

Common optional values:

- `NODE_ENV`
- `LOG_LEVEL`

## Setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Create your environment file.

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your own database, Redis, and email credentials.

4. Start the development server.

   ```bash
   npm run dev
   ```

The server starts on `PORT` or defaults to `5000`.

## Scripts

- `npm run dev` - Start the app in watch mode with `tsx`
- `npm run build` - Compile TypeScript with `tsc`
- `npm run start` - Run the compiled server from `dist/server.js`
- `npm run lint` - Lint JavaScript and TypeScript files

## API

Base path: `/api/v1`

Health check:

- `GET /health` - Returns a simple server status response

Questions:

- `GET /api/v1/questions` - List questions with pagination and sorting query params
- `GET /api/v1/questions/year?year=2025` - Filter questions by year
- `GET /api/v1/questions/topic?topic=physics` - Filter questions by topic
- `GET /api/v1/questions/:id` - Fetch a question by ID
- `GET /api/v1/questions/:topic/q?year=2025` - Fetch questions by topic and year
- `GET /api/v1/questions/:subject/:year/topic` - Get topic counts for a subject and year
- `GET /api/v1/questions/:subject/year` - List years available for a subject
- `GET /api/v1/questions/:subject/:topic?year=2025` - Fetch questions by subject, topic, and year

Report submission:

- `POST /api/v1/report` - Send a report email with `questionId`, `question`, and `issue`

## Docker

The repository includes Docker support.

- Development: `docker-compose.dev.yml`
- Production-style compose: `docker-compose.yml`

Typical usage:

```bash
docker compose -f docker-compose.dev.yml up --build
```

## Notes

- MongoDB and Redis are connected during server startup, so the app will exit if either connection fails.
- The questions module uses Redis caching for some lookup paths.
- The report endpoint sends mail through Gmail using the credentials provided in `.env`.