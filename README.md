# DayFlow HR Management System

A comprehensive HR Management System built with modern web technologies.

## Tech Stack

### Frontend
- **React.js** - UI library
- **Material UI** - Component library
- **Bootstrap** - CSS framework
- **HTML, CSS, JavaScript** - Core web technologies

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM (Object-Relational Mapping)
- **Neon** - Serverless PostgreSQL database

## Project Structure

```
DayFlow-HR-Management-System/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── .env (create this file)
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env (create this file)
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Neon database account (for PostgreSQL)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
DATABASE_URL="your_neon_database_connection_string"
PORT=5000
NODE_ENV=development
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (if needed for API endpoints):
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000` (or the port specified in your backend `.env` file).

## Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Environment Variables

Make sure to create `.env` files in both `backend/` and `frontend/` directories. These files are already included in `.gitignore` to keep sensitive information secure.

### Backend `.env` Example:
```
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

### Frontend `.env` Example:
```
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Clone the repository
2. Create a feature branch
3. Install dependencies (see Installation section)
4. Make your changes
5. Commit and push to your branch
6. Create a Pull Request

## License

ISC

