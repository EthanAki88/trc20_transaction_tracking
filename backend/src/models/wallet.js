const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance

// Define the Wallet model
const Wallet = sequelize.define('Wallet', {
    walletAddress: {
        type: DataTypes.STRING, // Wallet address as a string
        allowNull: false, // Wallet address is required
        unique: true, // Ensure wallet addresses are unique
        validate: {
            notEmpty: true // Ensure the field is not empty
        }
    },
    privateKey: {
        type: DataTypes.STRING, // Private key as a string
        allowNull: false // Private key is required
    },
    status: {
        type: DataTypes.ENUM('available', 'pending', 'success'), // Status can only be one of these values
        defaultValue: 'available' // Default status is 'available'
    },
    userId: {
        type: DataTypes.INTEGER, // Reference to the User model (foreign key)
        allowNull: true, // Can be null if the wallet is not assigned to a user
        references: {
            model: 'users', // Name of the referenced table
            key: 'id' // Primary key in the referenced table
        }
    }
}, {
    tableName: 'wallets', // Specify the table name in the database
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    hooks: {
        beforeUpdate: (wallet) => {
            wallet.updatedAt = new Date(); // Update `updatedAt` before saving
        }
    }
});

// Export the Wallet model
module.exports = Wallet;