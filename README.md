# E-Learning System 🎓

A scalable **E-Learning Backend System** built using **NestJS**, **TypeORM**, and **PostgreSQL**, following clean architecture principles and real-world backend best practices.

This project is designed to manage users, courses, and lessons with proper role-based access control and a clean relational database structure.

---

## 📌 Overview

The E-Learning System provides a backend foundation for an online learning platform where:

- Instructors can create courses and lessons
- Students can access educational content
- Admins can manage the system
- Lessons are ordered correctly inside courses
- Data integrity is preserved using proper relations

The project focuses on **backend correctness, scalability, and clean code**, rather than UI.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)

### 👤 User Management
- User roles:
  - Admin
  - Instructor
  - Student
- Secure access to endpoints based on roles

### 📚 Course Management
- Create, update, and delete courses
- Each course can contain multiple lessons
- Cascade delete (deleting a course deletes its lessons)

### 📘 Lesson Management
- Each lesson belongs to one course
- Lessons are ordered inside a course (`lessonOrder`)
- Lesson order is calculated dynamically
- Clean handling of relations (no redundant foreign keys)

### 🧱 Architecture
- Modular NestJS structure
- DTO-based validation
- Proper use of TypeORM relations
- Clean separation of concerns

---

## 🛠️ Tech Stack

- **Node.js**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **JWT**
- **Class Validator**
- **Class Transformer**

---

## 📂 Project Structure
src/
├── modules/
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ └── guards/
│ ├── users/
│ │ ├── entities/
│ │ ├── dtos/
│ │ ├── users.controller.ts
│ │ └── users.service.ts
│ ├── courses/
│ │ ├── entities/
│ │ ├── dtos/
│ │ ├── courses.controller.ts
│ │ └── courses.service.ts
│ ├── lessons/
│ │ ├── entities/
│ │ ├── dtos/
│ │ ├── lessons.controller.ts
│ │ └── lessons.service.ts
│ └── utils/
│ └── enum/
├── app.module.ts
└── main.ts


Each module contains:
- Controller
- Service
- Entity
- DTOs

---

## 🔑 Roles & Permissions

```ts
ADMIN
INSTRUCTOR
STUDENT
