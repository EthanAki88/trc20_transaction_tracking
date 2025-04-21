CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    walletAddress VARCHAR(255), -- Optional: Link to the assigned wallet
    virtualMoney DECIMAL(20, 8) DEFAULT 0 -- Virtual money balance
);

CREATE TABLE wallets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    walletAddress VARCHAR(255) NOT NULL UNIQUE,
    privateKey TEXT NOT NULL, -- Store the encrypted private key
    status ENUM('available', 'pending', 'success') DEFAULT 'available', -- Track wallet status
    userId INT DEFAULT NULL, -- Link to the user who owns the wallet
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL -- Maintain referential integrity
);