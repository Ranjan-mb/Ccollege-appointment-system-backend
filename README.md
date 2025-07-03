# Ccollege-appointment-system-backend
# 🎓 College Appointment Booking System – Backend API

A RESTful backend API that allows students to book appointments with professors and professors to manage their availability. The system implements **JWT-based role authentication**, **secure routing**, and includes **automated testing** using Jest and Supertest.

---

## 🚀 Features

- 👨‍🎓 Student Registration & Login
- 👨‍🏫 Professor Registration & Login
- 🔒 JWT-based Role Authentication (Student / Professor)
- 📅 Appointment Booking by Students
- 📆 Availability Management by Professors
- ✅ Protected Routes with Middleware
- 🧪 API Testing with Jest & Supertest
- 📬 API Testing via Postman

---

## 🛠️ Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Backend      | Node.js, Express.js      |
| Database     | MongoDB, Mongoose        |
| Auth         | JWT (JSON Web Token)     |
| Testing      | Jest, Supertest          |
| API Testing  | Postman                  |

---

## 📁 Project Structure

📦college-appointment-system
├── controllers/
├── middlewares/
├── models/
├── routes/
├── tests/
├── utils/
├── .env
├── app.js
├── server.js
├── package.json
└── README.md  


---

## 🔐 Authentication

- **JWT Token** is generated upon successful login.
- Token is required for protected routes via `Authorization: Bearer <token>`.
- Roles are validated in middleware (`isStudent`, `isProfessor`).

---

## 📦 API Endpoints

### 🔑 Auth
| Method | Endpoint       | Role         | Description              |
|--------|----------------|--------------|--------------------------|
| POST   | `/api/register` | Public       | Register as Student/Professor |
| POST   | `/api/login`    | Public       | Login and receive JWT    |

### 📅 Appointments
| Method | Endpoint             | Role      | Description                  |
|--------|----------------------|-----------|------------------------------|
| GET    | `/api/appointments`  | Student   | Get all booked appointments  |
| POST   | `/api/appointments`  | Student   | Book new appointment         |

### 🧑‍🏫 Availability
| Method | Endpoint             | Role      | Description                  |
|--------|----------------------|-----------|------------------------------|
| GET    | `/api/availability`  | Professor | View your availability       |
| POST   | `/api/availability`  | Professor | Set available time slots     |

---

## 🧪 Testing

Tests are written using **Jest** and **Supertest** for:

- Authentication (Register/Login)
- Protected routes access
- Appointment booking
- Professor slot management

Run tests using:
```bash
npm test

🔧 Setup & Run Locally
📦 Prerequisites
Node.js v16+

MongoDB (local or Atlas)

🔄 Installation
bash
Copy
Edit
git clone https://github.com/yourusername/college-appointment-system.git
cd college-appointment-system
npm install
🔐 Environment Variables
Create a .env file in the root with:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
▶️ Run the App
bash
Copy
Edit
npm run dev
📬 API Testing (Postman)
A complete Postman collection is available in the postman/ folder.
