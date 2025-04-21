import db from '../config/db.js';

/**
 * WalletModel handles all database operations related to wallets.
 */
class WalletModel {
    /**
     * Fetch the first available wallet.
     * @returns {Promise<Object|null>} - The first available wallet or null if none are found.
     */
    async getAvailableWallet() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM wallets WHERE status = "available" LIMIT 1';
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error fetching available wallet:', err);
                    return reject(err);
                }
                if (results.length === 0) {
                    console.warn('No available wallets found');
                    return resolve(null);
                }
                resolve(results[0]); // Return the first available wallet
            });
        });
    }

    /**
     * Assign a wallet to a user and update its status to "pending".
     * @param {number} walletId - The ID of the wallet to assign.
     * @param {number} userId - The ID of the user to assign the wallet to.
     * @returns {Promise<Object|null>} - The result of the update operation or null if no wallet was updated.
     */
    async assignWallet(walletId, userId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE wallets SET status = "pending", userId = ? WHERE id = ?';
            db.query(query, [userId, walletId], (err, result) => {
                if (err) {
                    console.error('Error updating wallet status:', err);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    console.warn('No wallet found with the given ID');
                    return resolve(null);
                }
                resolve(result);
            });
        });
    }

    /**
     * Fetch a wallet by the user ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Object|null>} - The wallet record or null if not found.
     */
    async getWalletByUserId(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM wallets WHERE userId = ? LIMIT 1';
            db.query(query, [userId], (err, results) => {
                if (err) {
                    console.error('Error fetching wallet by userId:', err);
                    return reject(err);
                }
                resolve(results[0]); // Return the wallet record
            });
        });
    }

    /**
     * Update the status of a wallet by its address.
     * @param {string} walletAddress - The wallet address.
     * @param {string} status - The new status to set (e.g., "available", "pending", "success").
     * @returns {Promise<Object>} - The result of the update operation.
     */
    async updateWalletStatus(walletAddress, status) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE wallets SET status = ? WHERE walletAddress = ?';
            db.query(query, [status, walletAddress], (err, result) => {
                if (err) {
                    console.error('Error updating wallet status:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * Fetch a wallet by its address.
     * @param {string} walletAddress - The wallet address to search for.
     * @returns {Promise<Object|null>} - The wallet record or null if not found.
     */
    async getWalletByAddress(walletAddress) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM wallets WHERE walletAddress = ? LIMIT 1';
            db.query(query, [walletAddress], (err, results) => {
                if (err) {
                    console.error('Error fetching wallet by address:', err);
                    return reject(err);
                }
                resolve(results[0]); // Return the wallet record
            });
        });
    }
}

export default new WalletModel();