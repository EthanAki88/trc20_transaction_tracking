/**
 * PaymentController handles all payment-related operations, including wallet assignment,
 * payment status checks, and webhook handling for transaction notifications.
 */
class PaymentController {
    constructor(tokenviewService, userModel, walletModel) {
        this.tokenviewService = tokenviewService; // Service for interacting with Tokenview APIs
        this.userModel = userModel; // Model for user-related database operations
        this.walletModel = walletModel; // Model for wallet-related database operations
    }

    /**
     * Handle payment endpoint.
     * This is a placeholder for future payment logic.
     */
    async handlePayment(req, res) {
        try {
            res.status(200).json({ message: 'Payment endpoint reached successfully.' });
        } catch (error) {
            console.error('Error in handlePayment:', error);
            res.status(500).json({ message: 'Error in handlePayment.', error: error.message });
        }
    }

    /**
     * Assign a wallet to a user.
     * If the user already has a wallet, return the existing wallet.
     * Otherwise, assign an available wallet and monitor it using Tokenview.
     */
    async assignWallet(req, res) {
        const { userId } = req.body;

        try {
            console.log('Processing wallet assignment for userId:', userId);

            if (!userId) {
                console.error('No userId provided in the request body');
                return res.status(400).json({ message: 'User ID is required.' });
            }

            // Check if the user already has a wallet assigned
            const wallet = await this.walletModel.getWalletByUserId(userId);
            if (wallet) {
                console.log(`User ${userId} already has a wallet assigned: ${wallet.address}`);
                return res.status(200).json({
                    message: 'User already has a wallet assigned.',
                    walletAddress: wallet.address
                });
            }

            // Get an available wallet
            const availableWallet = await this.walletModel.getAvailableWallet();
            if (!availableWallet) {
                console.warn('No available wallet addresses found');
                return res.status(400).json({ message: 'No available wallet addresses.' });
            }

            console.log('Assigning wallet:', availableWallet.address);

            // Update the wallet's status and assign it to the user
            await this.walletModel.assignWallet(availableWallet.id, userId);

            // Call addAddress to monitor the wallet
            const coin = 'trx'; // Replace with the appropriate coin abbreviation (e.g., 'eth', 'trx')
            const result = await this.tokenviewService.addAddress(coin, availableWallet.address);
            console.log('Wallet added for monitoring:', result);

            res.status(200).json({
                message: 'Wallet assigned and added for monitoring successfully.',
                walletAddress: availableWallet.address
            });
        } catch (error) {
            console.error('Error in assignWallet:', error);
            res.status(500).json({ message: 'Failed to assign wallet.', error: error.message });
        }
    }

    /**
     * Check the payment status of a transaction.
     * Fetches the transaction status from Tokenview and updates the user's virtual money if successful.
     */
    async checkPaymentStatus(req, res) {
        const { transactionId } = req.params;

        try {
            console.log(`Checking payment status for transactionId: ${transactionId}`);

            const status = await this.tokenviewService.checkTransaction(transactionId);
            if (status.success) {
                console.log(`Transaction successful for userId: ${status.userId}, amount: ${status.amount}`);
                await this.userModel.updateVirtualMoney(status.userId, status.amount);
                res.status(200).json({ message: 'Payment successful.', status });
            } else {
                console.warn(`Transaction not successful: ${status.message}`);
                res.status(400).json({ message: 'Payment not successful.', status });
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            res.status(500).json({ message: 'Error checking payment status.', error: error.message });
        }
    }

    /**
     * Handle webhook notifications from Tokenview.
     * Processes transaction data, updates the database, and removes the wallet from monitoring if successful.
     */
    async handleWebhook(req, res) {
        try {
            const { address, txid, time, confirmations, value, coin, height, tokenAddress, tokenSymbol, tokenValue } = req.body;

            console.log('Received webhook notification:', req.body);

            // Log the transaction details
            console.log(`Transaction Hash: ${txid}`);
            console.log(`Address: ${address}`);
            console.log(`Token Address: ${tokenAddress}`);
            console.log(`Token Symbol: ${tokenSymbol}`);
            console.log(`Token Value: ${tokenValue}`);
            console.log(`Coin: ${coin}`);
            console.log(`Confirmations: ${confirmations}`);
            console.log(`Block Height: ${height}`);
            console.log(`Timestamp: ${time}`);

            // Check if the transaction is successful
            if (parseFloat(tokenValue) > 0) {
                console.log(`Transaction successful for address: ${address}, adding to transaction history.`);

                // Add transaction history to the database
                const user = await this.userModel.getUserByWalletAddress(address);
                if (user) {
                    await this.userModel.addTransactionHistory({
                        userId: user.id,
                        address,
                        tokenValue,
                        tokenSymbol,
                        tokenAddress,
                        txid,
                        time
                    });
                    console.log('Transaction history added to database.');

                    // Update wallet status to "success"
                    await this.walletModel.updateWalletStatus(address, 'success');
                    console.log(`Wallet status updated to "success" for address: ${address}`);

                    // Set wallet address in the user's table
                    await this.userModel.updateWalletAddress(user.id, address);
                    console.log(`Wallet address set for user ID: ${user.id}`);
                } else {
                    console.warn(`No user found for address: ${address}`);
                }

                // Call removeAddress to stop monitoring the wallet
                const result = await this.tokenviewService.removeAddress(coin.toLowerCase(), address);
                console.log('Address removed from monitoring:', result);
            }

            // Respond to Tokenview to confirm receipt
            res.status(200).send('ok');
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).send('Error processing webhook');
        }
    }
}

// Export the PaymentController class
export default PaymentController;