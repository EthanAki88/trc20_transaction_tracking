import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WalletStatus = ({ userId }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const fetchWalletAddress = async () => {
            try {
                const response = await axios.get(`/api/wallet/${userId}`);
                setWalletAddress(response.data.walletAddress);
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            }
        };

        fetchWalletAddress();
    }, [userId]);

    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(`/api/payment/status/${walletAddress}`);
            setPaymentStatus(response.data.status);
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    };

    return (
        <div>
            <h2>Wallet Status</h2>
            <p>Assigned Wallet Address: {walletAddress}</p>
            <button onClick={checkPaymentStatus}>Check Payment Status</button>
            {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
        </div>
    );
};

export default WalletStatus;