const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance

// Define the User model
const User = sequelize.define('User', {
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: false, // Wallet address is required
        unique: true, // Ensure wallet addresses are unique
        validate: {
            notEmpty: true, // Ensure the field is not empty
            is: /^[a-zA-Z0-9]+$/i // Optional: Validate alphanumeric wallet addresses
        }
    },
    virtualMoney: {
        type: DataTypes.DECIMAL(18, 8), // Use DECIMAL for precise financial calculations
        allowNull: false,
        defaultValue: 0, // Default virtual money balance
        validate: {
            min: 0 // Ensure the balance cannot be negative
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Automatically set the creation date
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Automatically set the last updated date
    }
}, {
    tableName: 'users', // Specify the table name in the database
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    hooks: {
        beforeUpdate: (user) => {
            user.updatedAt = new Date(); // Update `updatedAt` before saving
        }
    }
});

// Export the User model
module.exports = User;