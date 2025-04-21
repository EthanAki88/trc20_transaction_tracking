import express from 'express';
import db from '../config/db.js';
import PaymentController from '../controllers/paymentController.js';

const router = express.Router();
const paymentController = new PaymentController();

// Define routes
router.post('/pay', paymentController.handlePayment.bind(paymentController));
router.get('/payment-status/:transactionId', paymentController.checkPaymentStatus.bind(paymentController));
router.post('/assign-wallet', paymentController.assignWallet.bind(paymentController)); // Updated route

export default router;