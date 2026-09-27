# Roadmap

## Phase 1 (current) — Core platform
- Project scaffolding (frontend, backend, database, docs)
- MySQL schema for all 8 tables + seed data
- JWT authentication (register/login) with BCrypt password hashing
- Spring Security stateless filter chain, role scaffolding (USER/ADMIN)
- Scheme entity, repository, controller (list / detail / search / pagination)
- Rules-based eligibility engine (11 factors) + public endpoint
- React frontend: Landing, Login, Register, Schemes, Eligibility Checker,
  Dashboard, About, Contact, 404, protected routing, Axios client, AuthContext
- Swagger/OpenAPI docs
- README, .env.example, .gitignore, LICENSE, deployment guide

## Phase 2 — Documents & AI
- Document upload endpoints (multipart) + storage under /uploads
- PDF eligibility report generation (iText) + download endpoint
- Google Gemini chatbot endpoint (/api/chatbot/ask) + chat_history persistence
- AI Assistant page wired to the chatbot endpoint

## Phase 3 — Admin & operations
- Admin login (separate JWT role) + Admin Dashboard analytics (Chart.js)
- Manage Users / Manage Schemes / View Uploaded Documents (CRUD)
- Notification system (in-app + email via Spring Mail)
- Audit logs

## Phase 4 — Account depth
- Profile editing + profile image upload
- Application submission + Application History page
- Forgot Password flow (email token reset)
- Settings page (notification preferences, password change)

## Phase 5 — Polish & deployment
- Dark mode
- Chart.js dashboards for applicant analytics
- CI (GitHub Actions): backend build + frontend build on PR
- Deployed demo links (Vercel + Render) added to README
