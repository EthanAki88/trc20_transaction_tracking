import db from '../config/db.js';

class UserModel {
    async getUserById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [userId], (err, results) => {
                if (err) {
                    console.error('Error fetching user by ID:', err);
                    return reject(err);
                }
                if (results.length === 0) {
                    console.warn(`No user found with ID: ${userId}`);
                    return resolve(null);
                }
                resolve(results[0]); // Return the user record
            });
        });
    }

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