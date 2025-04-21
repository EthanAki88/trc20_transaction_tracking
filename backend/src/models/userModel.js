import db from '../config/db.js';

class UserModel {
    // Method to assign a wallet to a user
    async assignWalletToUser(userId, walletAddress) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET walletAddress = ? WHERE id = ?';
            db.query(query, [walletAddress, userId], (err, result) => {
                if (err) {
                    console.error('Error assigning wallet to user:', err);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    console.warn('No user found with the given ID');
                    return resolve(null);
                }
                resolve(result);
            });
        });
    }

    // Other user-related methods can be added here
}

export default new UserModel();