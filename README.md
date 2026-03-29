# AI Job Application Tracker

Production-ready full-stack SaaS app built with Next.js App Router, Prisma, PostgreSQL, NextAuth, and OpenAI.

## Features

- Authentication with **Google OAuth** and **email/password**
- Job application CRUD tracker
- AI proposal generation from job descriptions
- Dashboard KPIs and analytics visualizations
- Protected routes and API endpoints
- Vercel-ready architecture

## Tech Stack

- Next.js (App Router) + React + Tailwind CSS
- ShadCN-style reusable UI components
- Next.js Route Handlers (`/app/api/*`)
- PostgreSQL + Prisma ORM
- NextAuth.js
- OpenAI API

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env vars:
   ```bash
   cp .env.example .env.local
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

## Required Environment Variables

See `.env.example` for all values.

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`

## API Routes

- `GET/POST/PUT/DELETE /api/jobs`
- `POST /api/ai/proposal`
- `GET/POST /api/auth/[...nextauth]`

## Deployment

Deploy directly to Vercel. Configure environment variables in your Vercel project and connect to a PostgreSQL database.
