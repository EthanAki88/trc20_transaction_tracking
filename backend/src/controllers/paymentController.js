class PaymentController {
    constructor(tokenviewService, userModel, walletModel) {
        this.tokenviewService = tokenviewService;
        this.userModel = userModel;
        this.walletModel = walletModel;
    }

    async handlePayment(req, res) {
        try {
            res.status(200).json({ message: 'Payment endpoint reached successfully.' });
        } catch (error) {
            console.error('Error in handlePayment:', error);
            res.status(500).json({ message: 'Error in handlePayment.', error: error.message });
        }
    }

    async assignWallet(req, res) {
        const { userId } = req.body;

        try {
            console.log('Processing wallet assignment for userId:', userId); // Log the userId

            if (!userId) {
                console.error('No userId provided in the request body');
                return res.status(400).json({ message: 'User ID is required.' });
            }

            // Check if the user already has a wallet assigned
            const user = await this.userModel.getUserById(userId);
            if (user.walletAddress) {
                console.log(`User ${userId} already has a wallet assigned: ${user.walletAddress}`);
                return res.status(200).json({ 
                    message: 'User already has a wallet assigned.', 
                    walletAddress: user.walletAddress 
                });
            }

            // Get an available wallet
            const wallet = await this.walletModel.getAvailableWallet();
            if (!wallet) {
                console.warn('No available wallet addresses found'); // Log a warning
                return res.status(400).json({ message: 'No available wallet addresses.' });
            }

            console.log('Assigning wallet:', wallet.walletAddress); // Log the wallet address

            // Update the wallet's status and assign it to the user
            await this.walletModel.assignWallet(wallet.id, userId);

            // Update the user's walletAddress
            await this.userModel.assignWalletToUser(userId, wallet.walletAddress);

            res.status(200).json({ 
                message: 'Wallet assigned successfully.', 
                walletAddress: wallet.walletAddress 
            });
        } catch (error) {
            console.error('Error in assignWallet:', error); // Log the error
            res.status(500).json({ message: 'Failed to assign wallet.', error: error.message });
        }
    }

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

    async handleWebhook(req, res) {
        try {
            const { transactionHash, blockHeight, from, to, value, timestamp } = req.body;

            console.log('Received webhook notification:', req.body);

            // Process the transaction data (e.g., update database, notify user)
            // Example: Log the transaction details
            console.log(`Transaction Hash: ${transactionHash}`);
            console.log(`From: ${from}, To: ${to}, Value: ${value}`);
            console.log(`Block Height: ${blockHeight}, Timestamp: ${timestamp}`);

            // Respond to Tokenview to confirm receipt
            res.status(200).send('ok');
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).send('Error processing webhook');
        }
    }
}

export default PaymentController; // Ensure this is exported as default