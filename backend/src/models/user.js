const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    virtualMoney: {
        type: Number,
        default: 0
    }
});

const User = model('User', userSchema);

module.exports = User;