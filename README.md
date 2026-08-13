# Beverages Inventory API

**Student Name:** IDOR GOD'SWILL IYOLI
**Matric Number:** 24/CSC/175
**Assigned Inventory Type:** Beverages

## Project Description

A backend REST API for managing a beverages inventory (soft drinks, beer, juice, water, energy drinks, etc.). The system supports secure admin login and full CRUD (Create, Read, Update, Delete) operations on inventory items. Data is persisted in a MySQL database. Only authenticated admins (via JWT) can access or modify inventory records.

## Technologies Used

- Node.js
- Express.js
- MySQL (via `mysql2`)
- JSON Web Tokens (`jsonwebtoken`) for authentication
- `bcryptjs` for password hashing
- `dotenv` for environment configuration

## Installation Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd beverages-inventory-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your MySQL credentials and a JWT secret:
   ```bash
   cp .env.example .env
   ```
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=beverages_inventory
   DB_PORT=3306
   JWT_SECRET=replace_this_with_a_long_random_string
   PORT=3000
   ```

## Database Setup

1. Make sure MySQL is installed and running.

2. Import the schema and sample data:
   ```bash
   mysql -u root -p < database/beverages_inventory.sql
   ```
   This creates the `beverages_inventory` database along with the `users` and `beverages` tables, and inserts 5 sample beverages.

3. Seed the default admin login (this hashes the password with bcrypt before storing it):
   ```bash
   npm run seed
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The API will run at `http://localhost:3000`.

## Login Credentials

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

> Created by running `npm run seed`. Change this password before any real deployment.

**How authentication works:** POST your credentials to `/api/auth/login` to receive a JWT. Include it as `Authorization: Bearer <token>` on every `/api/beverages` request — those routes are protected and will reject requests without a valid token.

## Features Implemented

- Admin login with JWT-based authentication
- Passwords hashed with bcrypt (never stored in plain text)
- Protected routes — all inventory endpoints require a valid token
- Full CRUD for beverages:
  - `GET /api/beverages` — list all beverages
  - `GET /api/beverages/:id` — get a single beverage
  - `POST /api/beverages` — add a new beverage
  - `PUT /api/beverages/:id` — update a beverage
  - `DELETE /api/beverages/:id` — remove a beverage
- Input validation with appropriate `400` / `404` error responses
- MySQL persistence (data survives server restarts)

## API Reference

### POST /api/auth/login
```json
{
  "username": "admin",
  "password": "admin123"
}
```
Response:
```json
{
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/beverages
```json
{
  "name": "Malta Guinness 33cl",
  "category": "Malt Drink",
  "quantity": 100,
  "price": 400.00,
  "supplier": "Guinness Nigeria"
}
```

### Testing with curl
```bash
# 1. Log in and get a token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# 2. Use the token to list beverages
curl http://localhost:3000/api/beverages \
  -H "Authorization: Bearer <paste_token_here>"

# 3. Add a new beverage
curl -X POST http://localhost:3000/api/beverages \
  -H "Authorization: Bearer <paste_token_here>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Malta Guinness 33cl", "category": "Malt Drink", "quantity": 100, "price": 400.00, "supplier": "Guinness Nigeria"}'
```

## Folder Structure

```
beverages-inventory-api/
├── app.js                        # Application entry point
├── package.json
├── .env.example
├── .gitignore
├── config/
│   └── db.js                     # MySQL connection pool
├── controllers/
│   ├── authController.js         # Login logic
│   └── beverageController.js     # CRUD logic
├── middleware/
│   └── authMiddleware.js         # JWT verification
├── routes/
│   ├── authRoutes.js
│   └── beverageRoutes.js
├── database/
│   └── beverages_inventory.sql   # Schema + sample data
├── scripts/
│   └── seed.js                   # Creates default admin user
└── README.md
```

## Screenshots

> Add screenshots here after testing (e.g. via Postman): the login request returning a token, and a GET/POST/PUT/DELETE request on `/api/beverages` using that token.

- `screenshots/login.png`
- `screenshots/get-beverages.png`
- `screenshots/post-beverages.png`
