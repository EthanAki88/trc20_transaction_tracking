import express from 'express';
import PaymentController from '../controllers/paymentController.js';
import walletModel from '../models/walletModel.js'; // Import walletModel
import userModel from '../models/userModel.js'; // Import userModel
import tokenviewService from '../services/tokenviewService.js'; // Import tokenviewService

const router = express.Router();

// Instantiate PaymentController with dependencies
const paymentController = new PaymentController(tokenviewService, userModel, walletModel);

/**
 * Define routes for payment-related operations.
 */

// Route to handle payments (placeholder for future logic)
router.post('/pay', paymentController.handlePayment.bind(paymentController));

// Route to check the payment status of a transaction
router.get('/payment-status/:transactionId', paymentController.checkPaymentStatus.bind(paymentController));

// Route to assign a wallet to a user
router.post('/assign-wallet', paymentController.assignWallet.bind(paymentController));

// Route to handle webhook notifications from Tokenview
router.post('/webhook', paymentController.handleWebhook.bind(paymentController));

// Route to set the webhook URL dynamically
router.post('/set-webhook', async (req, res) => {
    try {
        // Construct the webhook URL dynamically based on the request
        const webhookUrl = `${req.protocol}://${req.get('host')}/api/payment/webhook`;
        console.log(`Setting webhook URL to: ${webhookUrl}`);

        // Call the Tokenview service to set the webhook URL
        const result = await tokenviewService.setWebhookUrl(webhookUrl);
        res.status(200).json({ message: 'Webhook URL set successfully.', result });
    } catch (error) {
        console.error('Error setting webhook URL:', error);
        res.status(500).json({ message: 'Failed to set webhook URL.', error: error.message });
    }
});

export default router;