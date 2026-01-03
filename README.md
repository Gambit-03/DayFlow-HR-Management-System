# DayFlow HR Management System

A comprehensive HR Management System built with React.js, Node.js, Express.js, Prisma, and Neon PostgreSQL database.

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **Material UI** - Component library
- **Bootstrap** - CSS framework
- **React Router** - Routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM (Object-Relational Mapping)
- **Neon** - Serverless PostgreSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git**
- **Neon account** (for PostgreSQL database) - [Sign up here](https://neon.tech)

## 🔧 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Gambit-03/DayFlow-HR-Management-System.git
cd DayFlow-HR-Management-System
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL="your_neon_connection_string"
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```
   
   **How to get DATABASE_URL:**
   - Go to [Neon Console](https://console.neon.tech)
   - Create a new project or select existing one
   - Copy the connection string from "Connection Details"
   - Paste it as `DATABASE_URL` in your `.env` file

4. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```
   
   When prompted, enter a migration name (e.g., `init_hr_system`)

6. **Seed the database (create initial admin user):**
   ```bash
   npm run seed
   ```
   
   This creates:
   - Test Company
   - Admin user (email: `admin@test.com`, password: `admin123`)
   - Default time off types

### Step 3: Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   
   Create a `.env` file in the `frontend/` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

## 🏃 Running the Project

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

You should see:
```
Server is running on port 5000
Environment: development
```

### Start Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and open automatically in your browser.

## ✅ Verify Installation

### Test Backend

1. **Health Check:**
   Open in browser: `http://localhost:5000/health`
   
   Expected response:
   ```json
   {
     "status": "ok",
     "message": "DayFlow HR Management System API"
   }
   ```

2. **Run Automated Tests:**
   ```bash
   cd backend
   node test-api.js
   ```
   
   This will test all major endpoints and show results.

### Test Frontend

1. Navigate to `http://localhost:3000`
2. You should see the Sign In page
3. Use credentials: `admin@test.com` / `admin123`

## 📁 Project Structure

```
DayFlow-HR-Management-System/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication & validation
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   ├── migrations/    # Database migrations
│   │   └── seed.js        # Database seeding
│   ├── utils/             # Utility functions
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── .env               # Environment variables (not in git)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env               # Environment variables (not in git)
└── README.md
```

## 🔑 Default Credentials

After running the seed script, you can login with:

- **Email/LoginId:** `admin@test.com`
- **Password:** `admin123`
- **Role:** ADMIN

## 📚 Available Scripts

### Backend Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio (database GUI)
npm run seed            # Seed database with initial data
```

### Frontend Scripts

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
npm run eject          # Eject from Create React App
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Create user (Admin/HR only)
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/me` - Get current user

### Employees
- `GET /api/employees` - List employees
- `GET /api/employees/:id` - Get employee
- `POST /api/employees` - Create employee (Admin/HR)
- `PUT /api/employees/:id` - Update employee

### Attendance
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/summary` - Get attendance summary

### Time Off
- `GET /api/time-off/types` - Get time off types
- `GET /api/time-off/allocations` - Get allocations
- `GET /api/time-off/requests` - Get requests
- `POST /api/time-off/requests` - Create request
- `PUT /api/time-off/requests/:id/approve` - Approve (Admin/HR)
- `PUT /api/time-off/requests/:id/reject` - Reject (Admin/HR)

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile
- `GET /api/profile/salary` - Get salary
- `GET /api/profile/skills` - Get skills
- `GET /api/profile/certifications` - Get certifications

### Departments & Locations
- `GET /api/departments` - List departments
- `POST /api/departments` - Create department (Admin/HR)
- `GET /api/locations` - List locations
- `POST /api/locations` - Create location (Admin/HR)

For detailed API documentation, see `backend/TESTING_GUIDE.md`

## 🗄️ Database

The project uses **Neon** (serverless PostgreSQL). 

### Accessing Database

**Option 1: Prisma Studio (Recommended)**
```bash
cd backend
npm run prisma:studio
```
Opens a browser-based database GUI.

**Option 2: Neon Console**
- Go to [Neon Console](https://console.neon.tech)
- Select your project
- Use SQL Editor to run queries

### Database Schema

The database includes the following models:
- Company, User, Department, Location
- Attendance, TimeOffType, TimeOffRequest, TimeOffAllocation
- Salary, SalaryComponent, BankDetail
- Skill, UserSkill, Certification

See `backend/prisma/schema.prisma` for complete schema definition.

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
- Change `PORT` in `backend/.env` to a different port (e.g., 5001)

**Database connection error:**
- Verify `DATABASE_URL` in `.env` is correct
- Check if Neon database is active (not paused)
- Ensure connection string includes `?sslmode=require`

**Migration errors:**
- Make sure you've run `npm run prisma:generate` first
- Check that database is accessible

**JWT errors:**
- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random string for production

### Frontend Issues

**API connection errors:**
- Ensure backend server is running on port 5000
- Check `REACT_APP_API_URL` in `frontend/.env`
- Verify CORS is enabled in backend

**Module not found:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🔒 Security Notes

- Never commit `.env` files to git (already in `.gitignore`)
- Use strong `JWT_SECRET` in production
- Change default admin password after first login
- Use environment-specific `.env` files for different deployments

## 📖 Additional Documentation

- `backend/TESTING_GUIDE.md` - Complete API testing guide
- `backend/BACKEND_REVIEW.md` - Backend architecture review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👥 Authors

- **Gambit-03**

## 🙏 Acknowledgments

- Built with React, Node.js, Express, Prisma, and Neon
- UI components from Material UI and Bootstrap

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.
