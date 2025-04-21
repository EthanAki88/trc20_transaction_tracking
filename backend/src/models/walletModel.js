import db from '../config/db.js';

class WalletModel {
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
}

export default new WalletModel();