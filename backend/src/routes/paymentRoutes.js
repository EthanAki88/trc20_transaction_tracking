import express from 'express';
import PaymentController from '../controllers/paymentController.js';
import walletModel from '../models/walletModel.js'; // Import walletModel
import userModel from '../models/userModel.js'; // Import userModel
import tokenviewService from '../services/tokenviewService.js'; // Import tokenviewService

const router = express.Router();

// Instantiate PaymentController with dependencies
const paymentController = new PaymentController(tokenviewService, userModel, walletModel);

// Define routes
router.post('/pay', paymentController.handlePayment.bind(paymentController));
router.get('/payment-status/:transactionId', paymentController.checkPaymentStatus.bind(paymentController));
router.post('/assign-wallet', paymentController.assignWallet.bind(paymentController));
router.post('/webhook', paymentController.handleWebhook.bind(paymentController));

export default router;