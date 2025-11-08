# Waver – Workflow Automation Platform

**Next.js | TypeScript | Prisma | tRPC | Tailwind | shadcn/ui | BetterAuth | Stripe**

> ⚙️ Waver is a modern, full-stack workflow automation platform built with Next.js and TypeScript, enabling users to create, manage, and execute custom workflows integrated with AI, background jobs, and real-time event processing.

---

## 📋 Table of Contents

✨ Features  
🛠️ Tech Stack  
📁 Project Structure  
🚀 Quick Start  
⚙️ Installation  
🔧 Configuration  
🧱 Modules Overview  
🔐 Authentication  
💳 Payments Integration  
📊 Workflows Features  
🤝 Contributing  

---

## ✨ Features
### ⚙️ Core Platform

🔐 Secure authentication using BetterAuth  
🧠 AI Providers integration – Gemini, OpenAI, Anthropic  
⚙️ Background jobs via Inngest  
💳 Stripe + Polar payments integration  
🧾 Error monitoring via Sentry  
🎨 Dynamic theme & UI using Tailwind + shadcn/ui  
🧩 Visual workflow editor using react-flow  
⚡ tRPC-based full-stack type safety  
🧠 PostgreSQL + Prisma ORM for reliable data management  

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | tRPC v11, Prisma ORM, PostgreSQL |
| Auth | BetterAuth |
| Payments | Polar |
| Background Jobs | Inngest |
| AI Providers | Gemini, OpenAI, Anthropic |
| Error Tracking | Sentry |

---

## 📁 Project Structure
```bash
waver/
├── prisma/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── api/
│   │   └── sentry-example-page/
│   ├── components/
│   │   ├── react-flow/
│   │   └── ui/
│   ├── config/
│   ├── features/
│   │   ├── auth/
│   │   ├── editor/
│   │   ├── executions/
│   │   ├── subscriptions/
│   │   ├── triggers/
│   │   └── workflows/
│   ├── generated/
│   ├── hooks/
│   ├── inngest/
│   ├── lib/
│   └── trpc/
│
├── .env
├── .env.sentry-build-plugin
├── .gitignore
├── biome.json
├── components.json
├── mprocs.yaml
├── next.config.ts
├── postcss.config.mjs
├── prisma.config.mjs
├── sentry.edge.config.ts
├── sentry.server.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/sapmenc/waver.git
cd waver

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev 

# (Optional) Open Prisma Studio to inspect your database visually
npx prisma studio   # Opens at http://localhost:5555

# Start development server
npm run dev
```

---

## ⚙️ Installation
### 🧩 Prerequisites

Node.js v18.18+  
PostgreSQL v14+  
Git  

### 🧱 Setup Steps
```bash
npm install
npx prisma migrate dev
npm run dev
```

---

## 🔧 Configuration

Create a .env file in the root directory:

```env
# Database connection string for NeonDB
DATABASE_URL="postgresql://neondb_owner:npg_0LpvoBs1ASix@ep-lively-bonus-ad9mcbva-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Better auth security
BETTER_AUTH_SECRET="hZ56PucZkfkyXZNMKo6lEkkiOSmOEzxc"

# Base URL of your app
BETTER_AUTH_URL="http://localhost:3000"


# google generative AI
GOOGLE_GENERATIVE_AI_API_KEY="AIzaSyBzPcOydGNT7A6-z4w-zEMIb5vPcxTT6Z0"

# Sentry token
SENTRY_AUTH_TOKEN="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"

#polar
POLAR_ACCESS_TOKEN="polar_oat_jmokkcw9Dlgdxqu9WXGS0zUJXbn5hvBYkr0jP0uCV36"

#polar success url
POLAR_SUCCESS_URL="http://localhost:3000"
```

---

## 🧱 Modules Overview

### 01. Setup
- Environment (Node.js v18.18+)
- Setup Next.js app
- Setup shadcn/ui
- Create GitHub repository

### 02. Database & ORM
- Setup Prisma ORM
- Setup PostgreSQL
- Explore Prisma Studio

```bash
npx prisma studio
```
Opens a browser-based GUI at http://localhost:5555 to visually view, edit, and verify your database models and data.  
Useful for checking schema, testing relationships, and debugging data during development.
- Test Prisma API

### 03. tRPC Setup
- Install tRPC v11
- Create procedure with Prisma API
- Client-side + Server-side usage
- Prefetch queries

### 04. Authentication
- Setup BetterAuth
- Add Auth screens & utilities
- Add tRPC Auth procedures

### 05. Theme & Styling
- Apply new theme
- Improve Auth UI
- Add logos
- PR creation & merging

### 06. Background Jobs
- Setup Inngest
- Create background job
- Configure mprocs
- Push to GitHub

### 07. AI Providers
- Configure Gemini / OpenAI / Anthropic
- Setup AI SDK
- Use AI SDK with Inngest

### 08. Error Tracking
- Setup Sentry
- Add session replays, logs, AI monitoring

### 09. Sidebar Layout
- Improve structure
- Add placeholder routes
- Create sidebar layout

### 10. Payments
- Setup Polar
- Integrate with BetterAuth
- Create checkout and billing portal

### 11. Workflows CRUD
- Update Workflow schema
- Create API (CRUD operations)

### 12. Workflows Pagination
- Update getMany procedure
- Add NUQS for param handling (client/server)
- Add UI for pagination and search

### 13. Workflows UI
- Build UI components (Loading, Error, Empty, List, Item)

### 14. Workflow Page
- Load workflow by ID
- Prefetch via useSuspenseQuery
- Add loading/error states

### 15. Editor
- Create Editor component (react-flow)
- Add initial nodes
- Update schema (Node & Connection)
- Load default state

### 16. Node Selector
- Add Manual Trigger & HTTP Request nodes
- Create node selector
- Enable editor save functionality

### 17. Editor State
- Fix CodeRabbit bugs (onclick handlers, type casts)
- Add Save/Delete/Settings features

---

## 🔐 Authentication

Secure login with BetterAuth  
tRPC integrated auth procedures  
Role-based route protection  
Session persistence  

---

## 💳 Payments Integration

Integrated Stripe and Polar for checkout and billing  
Connected to BetterAuth users  
Secure and real-time payment management  

---

## 📊 Workflows Features

Full CRUD with Prisma + tRPC  
Paginated & searchable workflows list  
React Flow visual editor  
Node selector and state management  
Save/Delete workflow functionality  

---

## 🧠 AI Integration

Multi-provider setup (Gemini, OpenAI, Anthropic)  
Unified SDK interface  
Used in Inngest background jobs  

---

## 🧾 Error Tracking

Monitored with Sentry  
Session replays, logs, AI-specific tracing  
Integrated into server and client error boundaries  

---

## 🤝 Contributing

We welcome contributions!

```bash
# Fork the repo
git fork https://github.com/yourusername/waver.git

# Create feature branch
git checkout -b Dev

# Make changes and commit
git commit -m "Changes_markdown"

# Push branch
git push origin Dev
```