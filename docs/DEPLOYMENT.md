# Deployment Guide

## 1. Database (MySQL)
Use any managed MySQL provider (Render MySQL, Railway, PlanetScale, AWS RDS).

1. Create a MySQL 8 instance.
2. Run database/schema.sql against it (via the provider's console, mysql CLI,
   or a GUI like TablePlus/MySQL Workbench).
3. Note the host, port, database name, username, and password.

## 2. Backend to Render

1. Push this repository to GitHub.
2. In Render, create a New Web Service, connect the repo, set the root
   directory to backend/.
3. Build command: mvn clean package -DskipTests
4. Start command: java -jar target/government-scheme-portal-1.0.0.jar
5. Add environment variables (Render > Environment):
   - DB_USERNAME, DB_PASSWORD
   - Update spring.datasource.url to point at your managed MySQL host
   - JWT_SECRET - generate a long random string
   - MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD
   - GEMINI_API_KEY
   - CORS_ORIGINS - your deployed Vercel URL
6. Deploy. Render assigns a public URL.

## 3. Frontend to Vercel

1. In Vercel, Import Project from the same GitHub repo.
2. Set the root directory to frontend/.
3. Framework preset: Vite.
4. Build command: npm run build - output directory: dist.
5. Environment variable: VITE_API_BASE_URL=https://your-backend.onrender.com/api
6. Deploy. Vercel assigns a public URL.

## 4. Post-deploy checklist
- [ ] Update backend CORS_ORIGINS to the final Vercel URL (redeploy if changed)
- [ ] Change the seeded admin password immediately
- [ ] Rotate JWT_SECRET from the example value
- [ ] Verify /swagger-ui.html is reachable on the deployed backend
- [ ] Smoke-test register, login, eligibility check, and schemes search live
