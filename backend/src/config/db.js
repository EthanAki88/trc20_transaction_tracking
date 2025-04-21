import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Database configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST, // Database host (e.g., localhost)
    user: process.env.DB_USER, // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
    // connectionLimit: 10, // Maximum number of connections in the pool
    waitForConnections: true, // Wait for a free connection before throwing an error
    queueLimit: 0, // No limit on the number of queued connection requests
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        // Handle connection errors
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        } else {
            console.error('Error connecting to the database:', err);
        }
    } else {
        console.log('Connected to the MySQL database.');
        connection.release(); // Release the connection back to the pool
    }
});

// Export the pool for use in other parts of the application
export default pool;