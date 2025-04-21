import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [virtualMoney, setVirtualMoney] = useState(0);

    const assignWalletAddress = async (userId) => {
        try {
            const response = await axios.post('/api/payment/assign-wallet', { userId });
            setWalletAddress(response.data.walletAddress);
        } catch (error) {
            console.error('Error assigning wallet address:', error);
        }
    };

    const checkPaymentStatus = async (transactionId) => {
        try {
            const response = await axios.get(`/api/payment/status/${transactionId}`);
            setPaymentStatus(response.data.status);
            if (response.data.status === 'successful') {
                setVirtualMoney(prev => prev + response.data.amount);
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    };

    useEffect(() => {
        // Logic to fetch initial data or perform setup can go here
    }, []);

    return (
        <PaymentContext.Provider value={{ walletAddress, paymentStatus, virtualMoney, assignWalletAddress, checkPaymentStatus }}>
            {children}
        </PaymentContext.Provider>
    );
};