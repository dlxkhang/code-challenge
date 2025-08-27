# Scoreboard API Module

## Overview
Backend service for a real-time scoreboard. Provides secure score updates and displays the top 10 users with live updates.

## Features
- Shows the top 10 users by score
- Real-time updates to all clients
- Authenticated users can update their score
- Prevents unauthorized score changes

## API Endpoints

### POST `/api/auth/login`
Authenticate a user and issue a JWT token. (Use Passport.js for authentication and bcrypt for password hashing.)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "token": "jwt-token"
}
```

---

### GET `/api/users/scores?order=desc&limit=10`
Retrieve the top N users by score (default: top 10).

**Response:**
```json
[
  { "userId": 1, "username": "alice", "score": 120 },
  { "userId": 2, "username": "bob", "score": 110 }
  // ... up to N users
]
```

---

### PATCH `/api/users/me/score`
Update the authenticated user's score.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "score": 120
}
```

**Response:**
```json
{
  "userId": 1,
  "username": "alice",
  "score": 120
}
```

---

## Live Updates (Real-Time Scoreboard)

### Technology & Libraries
- [Socket.IO](https://socket.io/) (Node.js WebSocket library)

### Backend Specification
- **Socket Server Endpoint:**
  - Host: Same as API server or configurable (e.g., `ws://api.example.com:4000`)
  - Port: `4000` (default, configurable via `SOCKET_PORT` env variable)
  - Path: `/socket.io/` (default for Socket.IO)
- **Event:**
  - Name: `scoreboard:update`
  - Payload: Top 10 user scores (see below)
- **Authentication:**
  - Use JWT in the connection handshake (e.g., as a query param or in `auth` field)
  - Example: `io('ws://api.example.com:4000', { auth: { token: 'jwt-token' } })`
- **Environment Variables:**
  - `SOCKET_PORT=4000`
  - `SOCKET_CORS_ORIGIN=http://frontend.example.com`

### Example Event Payload
```json
{
  "scores": [
    { "userId": 1, "username": "alice", "score": 120 },
    { "userId": 2, "username": "bob", "score": 110 }
    // ... up to 10 users
  ]
}
```

## Improvements & Suggestions
- Add rate limiting and input validation to prevent abuse.
- Log all score changes for audit purposes.
- Use HTTPS and secure JWT handling.
- Only emit updates when the top 10 scores change.
- Use CORS settings to restrict allowed origins.
- Socket server and client should use a common configuration file or environment variables for connection settings (URL, port, path, etc.).
- Organize socket event handlers/listeners in separate files or folders by event type for scalability and maintainability.
- Implement a simple fallback mechanism on the client (e.g., retry connection or show a message) if the socket connection fails.
- Consider using session or cookie-based authentication to improve user experience during login and socket reconnection.
- All REST API endpoints and socket events must have unit tests to ensure correctness and prevent regressions.