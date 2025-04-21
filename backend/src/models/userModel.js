// Import the database configuration
import db from '../config/db.js';

// Define the UserModel class to handle user-related database operations
class UserModel {
    /**
     * Fetch a user by their ID.
     * @param {number} userId - The ID of the user to fetch.
     * @returns {Promise<Object|null>} - The user record or null if not found.
     */
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

    /**
     * Assign a wallet address to a user.
     * @param {number} userId - The ID of the user.
     * @param {string} walletAddress - The wallet address to assign.
     * @returns {Promise<Object|null>} - The result of the update operation or null if no user was updated.
     */
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

    /**
     * Fetch a user by their wallet address.
     * @param {string} walletAddress - The wallet address to search for.
     * @returns {Promise<Object|null>} - The user record or null if not found.
     */
    async getUserByWalletAddress(walletAddress) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.* 
                FROM users u
                INNER JOIN wallets w ON u.id = w.userId
                WHERE w.address = ?
            `;
            db.query(query, [walletAddress], (err, results) => {
                if (err) {
                    console.error('Error fetching user by wallet address:', err);
                    return reject(err);
                }
                resolve(results[0]); // Return the user record
            });
        });
    }

    /**
     * Update the wallet address for a user.
     * @param {number} userId - The ID of the user.
     * @param {string} walletAddress - The new wallet address to set.
     * @returns {Promise<Object>} - The result of the update operation.
     */
    async updateWalletAddress(userId, walletAddress) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET walletAddress = ? WHERE id = ?';
            db.query(query, [walletAddress, userId], (err, result) => {
                if (err) {
                    console.error('Error updating wallet address for user:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    // Other user-related methods can be added here
}

// Export an instance of the UserModel class
export default new UserModel();