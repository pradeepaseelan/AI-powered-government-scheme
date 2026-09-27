# API Documentation

Full interactive docs are auto-generated at runtime:
- Swagger UI: http://localhost:8081/swagger-ui.html
- OpenAPI JSON: http://localhost:8081/api-docs

## Auth

### POST /api/auth/register
{
  "fullName": "Asha Devi",
  "email": "asha@example.com",
  "password": "secret123",
  "phone": "9876543210"
}
Response: { "token": "...", "fullName": "...", "email": "...", "role": "USER" }

### POST /api/auth/login
{ "email": "asha@example.com", "password": "secret123" }

## Schemes (public)
- GET /api/schemes?page=0&size=9
- GET /api/schemes/{id}
- GET /api/schemes/search?keyword=farmer&page=0&size=9

## Eligibility (public)

### POST /api/public/eligibility/check
{
  "age": 45,
  "gender": "FEMALE",
  "annualIncome": 120000,
  "state": "Tamil Nadu",
  "occupation": "Farmer",
  "category": "OBC",
  "isDisabled": false,
  "isStudent": false,
  "isFarmer": true,
  "isWidow": true,
  "isSeniorCitizen": false
}

Returns an array of { schemeId, schemeName, eligible, matchScore, reason },
sorted eligible-first, highest match score first.
