import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Import payment routes
import tokenviewService from './services/tokenviewService.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json()); // Parse JSON request bodies (redundant with express.json)
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Allow only the specified origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
}));

// Routes
app.use('/api/users', userRoutes); // Register user routes
app.use('/api/payments', paymentRoutes); // Register payment routes

/**
 * Automatically set the webhook URL on server startup.
 * This ensures that the webhook URL is always up-to-date.
 */
const setWebhookOnStartup = async () => {
    try {
        const webhookUrl = `${process.env.SERVER_PROTOCOL || 'http'}://${process.env.SERVER_HOST || 'localhost'}:${PORT}/api/payments/webhook`;
        console.log(`Setting webhook URL to: ${webhookUrl}`);

        // Call the Tokenview service to set the webhook URL
        const result = await tokenviewService.setWebhookUrl(webhookUrl);
        console.log('Webhook URL set successfully:', result);
    } catch (error) {
        console.error('Error setting webhook URL on startup:', error.message);
    }
};

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await setWebhookOnStartup(); // Call the webhook setup function on startup
});