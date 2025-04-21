import axios from 'axios';
// import crypto from 'crypto';

class TokenviewService {
    constructor(db) {
        this.db = db;
        this.apiKey = process.env.TOKENVIEW_API_KEY; // Store your API key in the .env file
        this.baseUrl = 'https://services.tokenview.io/vipapi'; // Base URL for VIP Tokenview API
        this.freeBaseUrl = 'http://freeapi.tokenview.io'; // Base URL for free Tokenview API
    }

    // Check transaction status using the VIP API
    async checkTransaction(transactionId) {
        try {
            console.log(`Checking transaction status for ID: ${transactionId}`);
            const response = await axios.get(`${this.baseUrl}/tx/${transactionId}?apikey=${this.apiKey}`);

            if (response.data && response.data.success) {
                return {
                    success: true,
                    userId: response.data.userId, // Replace with actual field from API response
                    amount: response.data.amount // Replace with actual field from API response
                };
            } else {
                return { success: false, message: 'Transaction not found or failed.' };
            }
        } catch (error) {
            console.error('Error checking transaction:', error);
            throw new Error('Failed to check transaction status.');
        }
    }

    // Fetch transaction details using the VIP API
    async getTransactionInfo(transactionHash) {
        try {
            console.log(`Fetching transaction info for hash: ${transactionHash}`);
            const response = await axios.get(`${this.baseUrl}/tx/trx/${transactionHash}?apikey=${this.apiKey}`);

            if (response.data && response.data.success) {
                console.log('Transaction info retrieved successfully:', response.data);
                return response.data;
            } else {
                console.error('Failed to fetch transaction info:', response.data);
                throw new Error('Transaction not found or failed.');
            }
        } catch (error) {
            console.error('Error fetching transaction info:', error);
            throw new Error('Failed to fetch transaction info.');
        }
    }

    // Retrieve wallet address from the database
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

    // Add tracking condition using the VIP API
    async addTrackingCondition(condition) {
        try {
            const response = await axios.post(`${this.baseUrl}/tracking/add?apikey=${this.apiKey}`, condition, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.success) {
                console.log('Tracking condition added successfully:', response.data);
                return response.data;
            } else {
                console.error('Failed to add tracking condition:', response.data);
                throw new Error('Failed to add tracking condition');
            }
        } catch (error) {
            console.error('Error adding tracking condition:', error);
            throw new Error('Failed to add tracking condition');
        }
    }

    // Test API using the free version (limited to 1 call per minute)
    async testFreeApi(apiPath) {
        try {
            const response = await axios.get(`${this.freeBaseUrl}/${apiPath}`);
            return response.data;
        } catch (error) {
            console.error('Error testing free API:', error);
            throw new Error('Failed to test free API.');
        }
    }

    // Set webhook URL using the VIP API
    async setWebhookUrl(webhookUrl) {
        try {
            const response = await axios.post(`${this.baseUrl}/txmonitor/setwebhookurl?apikey=${this.apiKey}`, webhookUrl, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });

            if (response.data && response.data.code === 1) {
                console.log('Webhook URL set successfully:', response.data);
                return response.data;
            } else {
                console.error('Failed to set webhook URL:', response.data);
                throw new Error('Failed to set webhook URL');
            }
        } catch (error) {
            console.error('Error setting webhook URL:', error);
            throw new Error('Failed to set webhook URL');
        }
    }

    // Get Webhook URL
    async getWebhookUrl() {
        try {
            const response = await axios.get(`${this.baseUrl}/txmonitor/getwebhookurl?apikey=${this.apiKey}`);

            if (response.data && response.data.code === 1) {
                console.log('Webhook URL retrieved successfully:', response.data.data);
                return response.data.data;
            } else {
                console.error('Failed to retrieve webhook URL:', response.data);
                throw new Error('Failed to retrieve webhook URL');
            }
        } catch (error) {
            console.error('Error retrieving webhook URL:', error);
            throw new Error('Failed to retrieve webhook URL');
        }
    }

    // Add address for monitoring using the VIP API
    async addAddress(coin, address) {
        try {
            const response = await axios.get(`${this.baseUrl}/monitor/address/add/${coin}/${address}?apikey=${this.apiKey}`);

            if (response.data && response.data.code === 1) {
                console.log('Address added for monitoring successfully:', response.data);
                return response.data;
            } else {
                console.error('Failed to add address for monitoring:', response.data);
                throw new Error('Failed to add address for monitoring');
            }
        } catch (error) {
            console.error('Error adding address for monitoring:', error);
            throw new Error('Failed to add address for monitoring');
        }
    }

    // Remove address from monitoring using the VIP API
    async removeAddress(coin, address) {
        try {
            const response = await axios.get(`${this.baseUrl}/monitor/address/remove/${coin}/${address}?apikey=${this.apiKey}`);

            if (response.data && response.data.code === 1) {
                console.log('Address removed from monitoring successfully:', response.data);
                return response.data;
            } else {
                console.error('Failed to remove address from monitoring:', response.data);
                throw new Error('Failed to remove address from monitoring');
            }
        } catch (error) {
            console.error('Error removing address from monitoring:', error);
            throw new Error('Failed to remove address from monitoring');
        }
    }

    // List tracked addresses using the VIP API
    async listTrackedAddresses(coin, page = 0) {
        try {
            const response = await axios.get(`${this.baseUrl}/monitor/address/list/${coin}?page=${page}&apikey=${this.apiKey}`);

            if (response.data && response.data.code === 1) {
                console.log('Tracked addresses retrieved successfully:', response.data.data);
                return response.data.data;
            } else {
                console.error('Failed to retrieve tracked addresses:', response.data);
                throw new Error('Failed to retrieve tracked addresses');
            }
        } catch (error) {
            console.error('Error retrieving tracked addresses:', error);
            throw new Error('Failed to retrieve tracked addresses');
        }
    }

    // Get webhook history using the VIP API
    async getWebhookHistory(coin, page = 1) {
        try {
            const response = await axios.get(`${this.baseUrl}/monitor/webhookhistory/${coin}?page=${page}&apikey=${this.apiKey}`);

            if (response.data && response.data.code === 1) {
                console.log('Webhook history retrieved successfully:', response.data.data);
                return response.data.data;
            } else {
                console.error('Failed to retrieve webhook history:', response.data);
                throw new Error('Failed to retrieve webhook history');
            }
        } catch (error) {
            console.error('Error retrieving webhook history:', error);
            throw new Error('Failed to retrieve webhook history');
        }
    }

    // Validate Webhook Signature
    // validateWebhookSignature(signingKey, requestBody, receivedSignature) {
    //     const hmac = crypto.createHmac('sha256', signingKey);
    //     hmac.update(requestBody, 'utf8');
    //     const calculatedSignature = hmac.digest('hex');
    //     return calculatedSignature === receivedSignature;
    // }
}

export default new TokenviewService();