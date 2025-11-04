// server.js
// Entry point for the Express backend. Sets up middleware, routes, DB connection,
// basic logging, CORS and error handling. Exports the app (helpful for tests).

require('dotenv').config();
require('express-async-errors'); // handle async errors without try/catch in routes

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// ✅ Add this import
const enrollmentRoutes = require('./routes/enrollment');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// CORS - allow frontend at http://localhost:3000 or http://localhost:5173 (for Vite)
app.use(
	cors({
		origin: process.env.FRONTEND_URL || 'http://localhost:5173',
		credentials: true,
	})
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

// ✅ Add this line for your enrollment API
app.use('/api/enroll', enrollmentRoutes);

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', time: new Date().toISOString() });
});

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
const enrollmentRoutes = require('./routes/enrollment');
app.use('/api/enroll', enrollmentRoutes);
