# 🏛️ Scheme Setu — AI Powered Government Scheme Eligibility Portal

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/status-Phase%201%20complete-informational)

A full-stack platform where any citizen can search government welfare schemes, check
eligibility instantly against a transparent rules engine, and (once logged in) track
applications — built as a Smart India Hackathon 2025 mini project.

> **Build status:** This repository is being delivered in phases. **Phase 1 (this
> commit)** ships a fully working core: authentication, scheme browsing/search, and
> the eligibility engine, end-to-end across frontend and backend. See
> [`docs/ROADMAP.md`](docs/ROADMAP.md) for what's next (AI chatbot, admin panel,
> document upload + PDF reports, notifications).

---

## ✨ Features (Phase 1 — live)

- **Public eligibility checker** — no login required. Enter age, income, state,
  category, occupation, and status flags (student/farmer/widow/senior/disabled);
  get every scheme ranked by a transparent match score with reasons.
- **Scheme directory** — paginated, searchable across name/description/department.
- **JWT authentication** — register/login, BCrypt-hashed passwords, stateless
  security filter chain.
- **Dashboard** — logged-in landing spot, ready for the modules below.
- **Swagger / OpenAPI docs** at `/swagger-ui.html`.
- Responsive, accessible UI (Tailwind CSS) with a civic visual identity.

## 🚧 Roadmap (see `docs/ROADMAP.md`)

- Google Gemini-powered AI chatbot + `chat_history` persistence
- Document upload + PDF report generation (iText)
- Admin panel (manage users/schemes/documents, analytics dashboard)
- Email notifications (Spring Mail)
- Profile editing, application history, in-app notifications
- Forgot-password flow

---

## 🧱 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 18 (Vite), Tailwind CSS, React Router, Axios, React Icons, Chart.js |
| Backend    | Spring Boot 3, Java 21, Maven, Spring Security, JWT (jjwt), Spring Data JPA / Hibernate, Bean Validation, springdoc-openapi |
| Database   | MySQL 8 |
| AI         | Google Gemini API (Phase 2) |
| Deployment | Vercel (frontend), Render (backend), any MySQL host (database) |

---

## 📁 Folder Structure

```
government-scheme-portal/
├── frontend/                  # React + Vite + Tailwind app
│   ├── src/
│   │   ├── pages/             # Route-level pages
│   │   ├── components/        # Navbar, Footer, ProtectedRoute
│   │   ├── context/           # AuthContext
│   │   └── services/          # Axios API client
│   ├── package.json
│   └── .env.example
├── backend/                    # Spring Boot app
│   └── src/main/java/com/scheme/portal/
│       ├── controller/         # REST controllers
│       ├── service/            # Business logic (incl. eligibility engine)
│       ├── repository/         # Spring Data JPA repositories
│       ├── entity/             # JPA entities
│       ├── dto/                 # Request/response DTOs
│       ├── security/           # JWT filter + util
│       ├── config/             # Security + OpenAPI config
│       └── exception/          # Global exception handling
├── database/
│   └── schema.sql              # Full schema + seed data
├── docs/                       # API docs, roadmap, deployment guide
├── screenshots/                # Add UI screenshots here for GitHub
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started (VS Code / local)

### Prerequisites
- Java 21 (JDK)
- Maven 3.9+
- Node.js 18+ and npm
- MySQL 8 running locally

### 1. Database
```bash
mysql -u root -p < database/schema.sql
```
This creates the `government_scheme_portal` database, all tables, a seed admin
account, and 5 sample schemes.

> Default seeded admin: `admin@schemeportal.gov.in` / `Admin@123` — **change this
> immediately in any real deployment.**

### 2. Backend
```bash
cd backend
cp ../.env.example .env   # or export the variables in your shell / IDE run config
mvn clean install
mvn spring-boot:run
```
The API starts on **http://localhost:8080**. Swagger UI: `http://localhost:8080/swagger-ui.html`.

Environment variables (see `.env.example`): `DB_USERNAME`, `DB_PASSWORD`,
`JWT_SECRET`, `MAIL_*`, `GEMINI_API_KEY`, `CORS_ORIGINS`.

> Spring Boot doesn't auto-load `.env` files — either set these as real environment
> variables, pass them as `-D` system properties, or use an IDE run configuration /
> a tool like `direnv`. Sensible local defaults are already in `application.properties`.

### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
The app starts on **http://localhost:5173**.

---

## 🔌 Key API Endpoints

| Method | Endpoint                          | Auth   | Description |
|--------|------------------------------------|--------|--------------|
| POST   | `/api/auth/register`              | Public | Create a user account |
| POST   | `/api/auth/login`                 | Public | Log in, receive JWT |
| GET    | `/api/schemes`                    | Public | Paginated scheme list |
| GET    | `/api/schemes/{id}`               | Public | Scheme detail |
| GET    | `/api/schemes/search?keyword=`    | Public | Search schemes |
| POST   | `/api/public/eligibility/check`   | Public | Run the eligibility engine |

Full interactive documentation is generated automatically by Swagger at runtime.

---

## 🧮 How the Eligibility Engine Works

Each scheme carries hard constraints (age range, income ceiling, gender, category,
state) and soft targeting flags (student / farmer / widow / senior citizen /
disabled). For every scheme, the engine:

1. Checks every hard constraint the scheme defines against the applicant's answers.
   Any violation marks the scheme ineligible and records a plain-language reason.
2. Checks targeted-group flags — a scheme flagged "for farmers" requires
   `isFarmer = true`, regardless of how well the applicant matches everything else.
3. Computes a 0–100 **match score** as the weighted share of criteria satisfied,
   so applicants can see near-misses, not just pass/fail.

See `EligibilityService.java` for the full implementation.

---

## ☁️ Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for step-by-step guides to deploy:
- **Frontend → Vercel**
- **Backend → Render**
- **Database → any managed MySQL (Render, PlanetScale, Railway, etc.)**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/document-upload`
3. Commit using conventional commits, e.g. `feat: add document upload endpoint`
4. Open a pull request

Suggested commit prefixes: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.

## 📄 License

MIT — see [`LICENSE`](LICENSE).
