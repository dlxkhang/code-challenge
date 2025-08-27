# User CRUD API

A Node.js/Express REST API with TypeScript for managing users. Uses Prisma ORM with SQLite database and includes validation middleware.

## Features

- Full CRUD operations for users
- Input validation with class-validator
- Prisma ORM with SQLite database
- TypeScript support
- Error handling middleware

## Prerequisites

- Node.js (v16 or higher)
- Yarn or npm

## Setup Instructions

### 1. Clone and Navigate
```bash
cd src/problem5
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env
```

The `.env` file should contain:
```bash
DATABASE_URL="file:./dev.db"
PORT=3300
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (if any)
npx prisma db push

# Seed the database with sample data
yarn seed
# or
npm run seed
```

### 5. Start the Server

**Development mode (with hot reload):**
```bash
yarn dev
# or
npm run dev
```

**Production mode:**
```bash
# Build the project
yarn build
# or
npm run build

# Start the server
yarn start
# or
npm start
```

The server will start on `http://localhost:3300`

## API Endpoints

Base URL: `http://localhost:3300`

### GET /users
Get all users.

**Response:**
```json
{
  "data": [
    {
      "id": "clxy123456789",
      "email": "john@example.com",
      "fullName": "John Doe",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /users/:id
Get a specific user by ID.

**Response:**
```json
{
  "data": {
    "id": "clxy123456789",
    "email": "john@example.com",
    "fullName": "John Doe",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### POST /users
Create a new user.

**Request Body:**
```json
{
  "email": "jane@example.com",
  "fullName": "Jane Smith"
}
```

**Response:**
```json
{
  "data": {
    "id": "clxy987654321",
    "email": "jane@example.com",
    "fullName": "Jane Smith",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### PUT /users/:id
Update an existing user.

**Request Body:**
```json
{
  "fullName": "Updated Name"
}
```

**Response:**
```json
{
  "data": {
    "id": "clxy123456789",
    "email": "updated@example.com",
    "fullName": "Updated Name",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T01:00:00.000Z"
  }
}
```

### DELETE /users/:id
Delete a user by ID.

**Response:**
```json
{
  "data": {
    "success": true
  }
}
```

## Testing the API

### Using curl

**Get all users:**
```bash
curl http://localhost:3300/users
```

**Create a user:**
```bash
curl -X POST http://localhost:3300/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test User"}'
```

**Get a specific user:**
```bash
curl http://localhost:3300/users/{user-id}
```

**Update a user:**
```bash
curl -X PUT http://localhost:3300/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{"email":"updated@example.com","fullName":"Updated User"}'
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:3300/users/{user-id}
```

### Using Postman
Import the following endpoints into your API client:

- GET `http://localhost:3300/users`
- GET `http://localhost:3300/users/{id}`
- POST `http://localhost:3300/users`
- PUT `http://localhost:3300/users/{id}`
- DELETE `http://localhost:3300/users/{id}`

## Project Structure

```
src/
├── api/
│   └── user/
│       ├── dto/                    # Data Transfer Objects
│       ├── user.controller.ts      # Route handlers
│       ├── user.service.ts         # Business logic
│       └── index.ts               # Router setup
├── bin/
│   └── index.ts                   # Server entry point
├── middlewares/
│   └── validation.middleware.ts   # Request validation
├── route/
│   └── index.ts                   # Route configuration
└── app.ts                         # Express app setup
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **SQLite** - Database
- **class-validator** - Input validation
- **class-transformer** - Object transformation

## Development

- The server uses nodemon for hot reloading in development mode
- Prisma generates type-safe database client
- Validation middleware automatically validates request bodies
- Error handling middleware catches and formats errors

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file or kill the process
lsof -ti:3300 | xargs kill -9
```

**Database issues:**
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
yarn seed
```

**TypeScript errors:**
```bash
# Regenerate Prisma client
npx prisma generate
```
