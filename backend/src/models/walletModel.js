// filepath: d:\MY-DEV\React\jinkouyan\transaction-tracking-app\backend\src\models\walletModel.js
import db from '../config/db.js';

class WalletModel {
    // Method to get an available wallet
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

    // Other wallet-related methods can be added here
}

export default new WalletModel();