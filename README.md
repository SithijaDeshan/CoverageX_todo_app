# TaskFlow - To-Do Application

A modern full-stack task management application built with Spring Boot, React, and MySQL. Features a glassmorphism UI, comprehensive testing, and Docker deployment.

---

## Quick Start

### Prerequisites

- Docker & Docker Compose

### Run the Application

```bash
# Clone repository
git clone <repository-url>
cd CoverageX

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080/api/tasks
# Database: localhost:3306
```

That's it! The complete stack is now running.

---

## Features

- Create tasks with title and description
- View 5 most recent incomplete tasks
- Mark tasks as completed
- Completed tasks automatically hidden from view
- All data persisted in MySQL database
- Modern glassmorphism UI with animations
- Fully tested (Unit + Integration + E2E)
- Production-ready Docker deployment

---

## Architecture

```
Frontend (React + TypeScript + Tailwind)
    ↓ REST API
Backend (Spring Boot + JPA)
    ↓ JDBC
Database (MySQL 8)
```

**Backend Layers:**

```
Controller → Service → Repository → Database
```

### Tech Stack

**Backend:**

- Java 17
- Spring Boot 3.5.8
- Spring Data JPA
- MySQL 8
- JUnit 5 + Mockito

**Frontend:**

- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS 3.4.0
- Vite 7.2.4
- Vitest + Cypress

**Infrastructure:**

- Docker + Docker Compose
- Nginx (production web server)
- Maven (backend build)

---

## Project Structure

```
CoverageX/
├── todo-backend/              # Spring Boot API
│   ├── src/main/java/
│   │   ├── config/           # Configuration
│   │   ├── controller/       # REST controllers
│   │   ├── dto/              # Data transfer objects
│   │   ├── mapper/           # DTO-Entity mappers
│   │   ├── model/            # JPA entities
│   │   ├── repository/       # Data access
│   │   └── service/          # Business logic
│   ├── src/test/             # Unit tests
│   ├── Dockerfile
│   └── pom.xml
│
├── todo-frontend/             # React SPA
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API client
│   │   └── types/            # TypeScript types
│   ├── cypress/              # E2E tests
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml         # Container orchestration
```

---

## API Documentation

**Base URL:** `http://localhost:8080/api/tasks`

### Endpoints

#### 1. Create Task

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write README file"
}
```

**Response (201):**

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write README file",
  "completed": false,
  "createdAt": "2025-12-08T17:30:00"
}
```

#### 2. Get Recent Tasks

```http
GET /api/tasks/recent
```

Returns 5 most recent incomplete tasks.

#### 3. Complete Task

```http
PUT /api/tasks/{id}
```

Marks task as completed (204 No Content).

---

## Database Schema

**Table:** `task`

| Column      | Type         | Constraints                 | Description        |
| ----------- | ------------ | --------------------------- | ------------------ |
| id          | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier  |
| title       | VARCHAR(255) | NOT NULL                    | Task title         |
| description | TEXT         | NULLABLE                    | Task description   |
| completed   | BOOLEAN      | NOT NULL, DEFAULT FALSE     | Completion status  |
| created_at  | TIMESTAMP    | NOT NULL                    | Creation timestamp |

---

## Testing

### Backend Tests

```bash
cd todo-backend
mvn test                    # Run unit tests
mvn test jacoco:report      # With coverage
```

**Coverage:**

- Task creation tests
- Task completion tests
- Recent tasks retrieval tests

### Frontend Unit Tests

```bash
cd todo-frontend
npm install
npm test                    # Run unit tests
npm test -- --watch         # Watch mode
```

**Coverage:**

- TaskCard component tests
- TaskForm component tests
- TaskList component tests

### E2E Tests

```bash
cd todo-frontend
npm run test:e2e           # Headless mode
npm run cy:open            # Interactive mode
```

**Coverage:**

- Task creation scenarios (10 tests)
- Task completion scenarios (4 tests)
- UI states and error handling (6 tests)

---

## Docker Commands

### Production

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean restart (removes data)
docker-compose down -v
docker-compose up --build
```

### Development

```bash
# Run only database
docker-compose up mysql -d

# Backend (separate terminal)
cd todo-backend
./mvnw spring-boot:run

# Frontend (separate terminal)
cd todo-frontend
npm run dev
```

---

## Troubleshooting

### Port Already in Use

**Windows:**

```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Linux/Mac:**

```bash
lsof -ti:8080 | xargs kill -9
```

### Database Connection Failed

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs mysql

# Restart database
docker-compose restart mysql

# Full reset
docker-compose down -v
docker-compose up --build
```

### Frontend Build Errors

```bash
# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up frontend
```

---

## Design Principles

This project follows:

- ✓ Clean Architecture (layered separation)
- ✓ SOLID Principles
- ✓ RESTful API design
- ✓ Component-based UI architecture
- ✓ Test-driven development
- ✓ Docker-first deployment

---

## Project Highlights

- **Modern UI:** Glassmorphism design with smooth animations
- **Type-Safe:** Full TypeScript implementation on frontend
- **Well-Tested:** 20+ E2E tests, comprehensive unit tests
- **Clean Code:** Follows industry best practices
- **Docker-Ready:** Single command deployment
- **Production-Ready:** Multi-stage builds, optimized containers

---