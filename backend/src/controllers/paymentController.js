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

            const wallet = await this.walletModel.getAvailableWallet();
            if (!wallet) {
                console.warn('No available wallet addresses found'); // Log a warning
                return res.status(400).json({ message: 'No available wallet addresses.' });
            }

            console.log('Assigning wallet:', wallet.walletAddress); // Log the wallet address
            await this.userModel.assignWalletToUser(userId, wallet.walletAddress);

            res.status(200).json({ message: 'Wallet assigned successfully.', walletAddress: wallet.walletAddress });
        } catch (error) {
            console.error('Error in assignWallet:', error); // Log the error
            res.status(500).json({ message: 'Failed to assign wallet.', error: error.message });
        }
    }

    async checkPaymentStatus(req, res) {
        const { transactionId } = req.params;

        try {
            const status = await this.tokenviewService.checkTransaction(transactionId);
            if (status.success) {
                await this.userModel.updateVirtualMoney(status.userId, status.amount);
                res.status(200).json({ message: 'Payment successful.', status });
            } else {
                res.status(400).json({ message: 'Payment not successful.', status });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error checking payment status.', error: error.message });
        }
    }
}

export default PaymentController; // Ensure this is exported as default