import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Import payment routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes); // Register payment routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});