class TokenviewService {
    constructor(db) {
        this.db = db;
    }

    async checkTransaction(transactionId) {
        try {
            const response = await fetch(`https://api.tokenview.io/vip/transaction/${transactionId}`);
            const data = await response.json();
            return data.data && data.data.confirmations > 0; // Check if the transaction has confirmations
        } catch (error) {
            console.error('Error checking transaction:', error);
            throw new Error('Transaction check failed');
        }
    }

    async getWalletAddress() {
        try {
            const [rows] = await this.db.query('SELECT address FROM wallets WHERE assigned = 0 LIMIT 1');
            if (rows.length > 0) {
                const walletAddress = rows[0].address;
                await this.db.query('UPDATE wallets SET assigned = 1 WHERE address = ?', [walletAddress]);
                return walletAddress;
            }
            throw new Error('No available wallet addresses');
        } catch (error) {
            console.error('Error retrieving wallet address:', error);
            throw new Error('Failed to retrieve wallet address');
        }
    }
}

module.exports = TokenviewService;