import React, { useState } from 'react';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/payments/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Payment successful!');
                setError('');
            } else {
                setError(data.message);
                setSuccess('');
            }
        } catch (err) {
            setError('Error processing payment');
            setSuccess('');
        }
    };

    const handleAssignWallet = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
            if (!userId) {
                alert('User ID not found. Please log in.');
                return;
            }

            const response = await fetch('http://localhost:5000/api/payments/assign-wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }), // Use the retrieved userId
            });

            const data = await response.json();
            if (response.ok) {
                setWalletAddress(data.walletAddress);
                alert('Wallet assigned successfully!');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error assigning wallet');
        }
    };

    return (
        <div>
            <h2>Payment Form</h2>
            <form onSubmit={handlePayment}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit">Pay</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button onClick={handleAssignWallet}>Assign Wallet</button>
            {walletAddress && (
                <div>
                    <h3>Assigned Wallet Address:</h3>
                    <p>{walletAddress}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;