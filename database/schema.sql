-- Create the `users` table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the users table
    username VARCHAR(255) NOT NULL UNIQUE, -- Unique username for the user
    password VARCHAR(255) NOT NULL, -- Store hashed passwords for security
    walletAddress VARCHAR(255), -- Optional: Link to the assigned wallet address
    virtualMoney DECIMAL(20, 8) DEFAULT 0, -- Virtual money balance with precision
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record last update timestamp
);

-- Create the `wallets` table
CREATE TABLE wallets (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the wallets table
    walletAddress VARCHAR(255) NOT NULL UNIQUE, -- Unique wallet address
    privateKey TEXT NOT NULL, -- Store the encrypted private key
    status ENUM('available', 'pending', 'success') DEFAULT 'available', -- Track wallet status
    userId INT DEFAULT NULL, -- Link to the user who owns the wallet
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record last update timestamp
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL -- Maintain referential integrity
);

-- Add an index to improve query performance for walletAddress in the `users` table
CREATE INDEX idx_users_walletAddress ON users(walletAddress);

-- Add an index to improve query performance for status in the `wallets` table
CREATE INDEX idx_wallets_status ON wallets(status);