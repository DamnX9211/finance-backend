# Finance Data Processing & Access Control Backend
 
## Overview

Built a backend system for managing financial records with role-based access control and dashboard analytics. The system supports different user roles (admin, analyst, viewer) with controlled access to data and operations.



## Features

- User authentication using JWT
- Role-based access control (admin, analyst, viewer)
- Financial records CRUD with filtering
- Handles chain linking between contacts
- Dashboard analytics (income, expense, category breakdown)
- Pagination support
- Input validation and structured error handling

## Tech Stack

FastAPI  
PostgreSQL  
JWT Authentication  
SQLAlchemy  



## Architecture
The project follows a layered architecture separating routes, services, and database models. Business logic is handled in the service layer to keep API routes clean and maintainable. Role-based access control is implemented using dependency injection to enforce permissions consistently across endpoints.

## API Overview

```json
/auth
/users
/records
/dashboard
```

## Access Control Logic

- Admin: Full access
- Analyst: Read-only access to records and dashboard
- Viewer: Restricted to dashboard view

## Assumptions

Authentication is simplified using JWT without refresh tokens to focus on access control logic.
Role assignment during registration is allowed for demonstration purposes.
Record ownership restrictions are not enforced but can be extended.

## Project Structure
```
app/
 ├── main.py
 ├── core/
 │    ├── config.py
 │    ├── security.py
 │
 ├── models/
 │    ├── user.py
 │    ├── role.py
 │    ├── financial_record.py
 │
 ├── schemas/
 │    ├── user_schema.py
 │    ├── record_schema.py
 │
 ├── api/
 │    ├── routes/
 │    │     ├── user_routes.py
 │    │     ├── record_routes.py
 │    │     ├── dashboard_routes.py
 │
 ├── services/
 │    ├── user_service.py
 │    ├── record_service.py
 │    ├── dashboard_service.py
 │
 ├── dependencies/
 │    ├── role_checker.py
 │
 ├── db/
 │    ├── database.py
```
---

## Setup Instructions

```bash
git clone ...
cd ...
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Future Improvements

- Record ownership restrictions
- Advanced analytics
- Caching layer (Redis)
- Rate limiting


