const { Schema, model } = require('mongoose');

const walletSchema = new Schema({
    walletAddress: { // Changed from 'address' to 'walletAddress'
        type: String,
        required: true,
        unique: true
    },
    privateKey: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'pending', 'success'],
        default: 'available'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        default: null
    }
});

const Wallet = model('Wallet', walletSchema);

module.exports = Wallet;