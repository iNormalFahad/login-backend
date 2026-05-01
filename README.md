# Login Backend

A simple authentication REST API built with **Node.js**, **Express**, and **MariaDB**, featuring a clean login/register UI powered by **EJS**.

## Features

- User registration & login
- Password hashing with **bcryptjs**
- JWT-based authentication
- Security headers via **Helmet**
- CORS protection
- Rate limiting on all endpoints
- Auto-creates the database and tables on startup
- EJS frontend with tab-based Login / Sign Up form

## Tech Stack

| Layer        | Technology          |
| ------------ | ------------------- |
| Runtime      | Node.js             |
| Framework    | Express 5           |
| Database     | MariaDB (mysql2)    |
| Auth         | JSON Web Tokens     |
| Hashing      | bcryptjs            |
| Templating   | EJS                 |
| Security     | Helmet, CORS, express-rate-limit |

## Project Structure

```
login-backend/
├── src/
│   ├── app.js                  # Entry point
│   ├── config/
│   │   └── db.js               # MariaDB connection & auto-setup
│   ├── controllers/
│   │   └── authController.js   # Register / Login / Me logic
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── security.js         # Rate limiters
│   ├── routes/
│   │   └── auth.js             # Auth routes
│   ├── views/
│   │   └── index.ejs           # Login & Sign Up page
│   └── public/
│       ├── style.css
│       └── script.js
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- MariaDB running locally

### Installation

```bash
git clone https://github.com/your-username/login-backend.git
cd login-backend
npm install
```

### Environment Variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=8080

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=login_db

CORS_ORIGIN=http://localhost:5173
```

> The database and tables are created automatically on first run.

### Run

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080)

## API Endpoints

| Method | Endpoint             | Auth   | Description          |
| ------ | -------------------- | ------ | -------------------- |
| POST   | `/api/auth/register` | No     | Create a new account |
| POST   | `/api/auth/login`    | No     | Login & get token    |
| GET    | `/api/auth/me`       | Bearer | Get current user     |

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "John",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

## Security

### Helmet
Sets secure HTTP headers on every response to protect against common web vulnerabilities (XSS, clickjacking, MIME sniffing, etc.).

### CORS
Restricts API access to the origin defined in `CORS_ORIGIN`. Only `GET` and `POST` methods are allowed, along with `Content-Type` and `Authorization` headers.

### Rate Limiting

| Scope               | Limit        | Window     |
| ------------------- | ------------ | ---------- |
| All routes          | 100 requests | 15 minutes |
| `POST /login`       | 10 requests  | 15 minutes |
| `POST /register`    | 5 requests   | 1 hour     |

Exceeding the limit returns `429 Too Many Requests`.

## License

MIT
