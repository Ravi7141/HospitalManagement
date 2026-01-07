# 🏥 Hospital Management System

A full-stack healthcare management application built with **Spring Boot** and **Next.js**, featuring patient management, doctor scheduling, appointment booking, and insurance tracking.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-green?style=flat-square&logo=springboot)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)

---

## ✨ Features

- **Patient Management** - Register, update, and manage patient records
- **Doctor Management** - Manage doctor profiles and specializations
- **Appointment Scheduling** - Book and manage medical appointments
- **Department Management** - Organize doctors by departments
- **Insurance Tracking** - Track patient insurance information
- **User Authentication** - Secure login and registration system
- **Dark/Light Theme** - Modern UI with theme switching support
- **Animated UI** - Aurora backgrounds and glassmorphic design

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Spring Boot 3.5.6** | REST API Framework |
| **Spring Data JPA** | Database ORM |
| **Spring Security** | Authentication & Authorization |
| **PostgreSQL** | Relational Database |
| **Lombok** | Boilerplate Reduction |
| **Maven** | Build Tool |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React Framework |
| **React 18** | UI Library |
| **Axios** | HTTP Client |
| **CSS3** | Styling (Dark/Light themes) |

---

## 📁 Project Structure

```
hospitalManagement/
├── src/main/java/com/example/hospitalmanagement/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST API endpoints
│   ├── dto/             # Data Transfer Objects
│   ├── entity/          # JPA Entities
│   ├── repository/      # Data Access Layer
│   └── service/         # Business Logic
├── frontend/
│   ├── app/             # Next.js pages
│   ├── components/      # Reusable React components
│   ├── context/         # React Context (Theme)
│   └── lib/             # Utility functions
└── pom.xml              # Maven configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+**
- **Node.js 18+**
- **PostgreSQL 14+**
- **Maven** (or use included wrapper)

### Backend Setup

1. **Configure Database**
   
   Create a PostgreSQL database and update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

2. **Run the Backend**
   ```bash
   # Using Maven Wrapper
   ./mvnw spring-boot:run
   
   # Or using Maven
   mvn spring-boot:run
   ```
   
   Backend runs on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Frontend runs on `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| POST | `/api/patients` | Create patient |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}` | Delete patient |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/{id}` | Get doctor by ID |
| POST | `/api/doctors` | Create doctor |
| PUT | `/api/doctors/{id}` | Update doctor |
| DELETE | `/api/doctors/{id}` | Delete doctor |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Create appointment |
| PUT | `/api/appointments/{id}` | Update appointment |
| DELETE | `/api/appointments/{id}` | Delete appointment |

### Departments & Insurance
Similar CRUD operations available for departments and insurance management.

---

## 🎨 Screenshots

> *Coming soon - Screenshots of the modern UI with Aurora backgrounds*

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Author

**Ravi Rajput**

- GitHub: [@Ravi7141](https://github.com/Ravi7141)

---

<p align="center">
  Made with ❤️ for better healthcare management
</p>
