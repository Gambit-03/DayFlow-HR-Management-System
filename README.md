
# DayFlow: The Digital Workspace for HR Operations

DayFlow is a centralized platform designed to digitize and automate the manual overhead of managing a workforce. It replaces spreadsheets and paper forms with a streamlined digital workflow.

Automates Onboarding: The system removes manual ID creation by automatically generating unique credentials based on employee names and joining dates.

Visualizes Workforce Status: It provides a real-time "bird's-eye view" of who is in the office, who is absent, and who is on leave using color-coded status indicators.

Simplifies Leave Management: It creates a formal bridge between employees and HR, allowing for digital leave applications with required documentation (like medical certificates) and a one-click approval/rejection system.

Calculates Complex Payroll: It takes the "math stress" out of HR by automatically computing salary components (Basic, HRA, PF, etc.) and adjusting pay based on attendance records.

### Built With

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![Prisma][Prisma.io]][Prisma-url]
* [![Neon][Neon.tech]][Neon-url]
* [![MUI][MUI.com]][MUI-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

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

## Authors

- [@Gambit-03](https://github.com/Gambit-03)
- [@Karnav018](https://github.com/Karnav018)
- [@Solanki-Prem](https://github.com/Solanki-Prem)
- [@Ashmitayadav004](https://github.com/Ashmitayadav004)



## Acknowledgements

 - [Neon Serverless Postgres](https://neon.com/)
 - [Prisma ORM](https://www.prisma.io/)
 - [Material UI Components](https://mui.com/)
 - [Odoo HR Management Patterns](https://www.odoo.com/)
 - [Image Shields](https://shields.io/)






## 📄 License

Distributed under the ISC License. See [ISC](https://www.isc.org/licenses/) for more information.


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/

[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[Prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/

[Neon.tech]: https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=Neon&logoColor=black
[Neon-url]: https://neon.tech/

[MUI.com]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com



