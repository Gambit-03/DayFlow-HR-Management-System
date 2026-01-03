import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './utils/errors.js';
import authRoutes from './routes/auth.routes.js';
import employeesRoutes from './routes/employees.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import timeoffRoutes from './routes/timeoff.routes.js';
import profileRoutes from './routes/profile.routes.js';
import departmentsRoutes from './routes/departments.routes.js';
import locationsRoutes from './routes/locations.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DayFlow HR Management System API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/time-off', timeoffRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/locations', locationsRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

