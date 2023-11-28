import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SendMoneyForm = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const senderEmail = Cookies.get('userEmail') || null;
            if (!senderEmail) {
                setError('Sender email not found. Please log in.');
                return;
            }

            const response = await axios.post(apiUrl + '/api/send', {
                senderEmail,
                receiverEmail: recipient,
                amount
            });

            console.log('Transaction successful:', response.data);
            setIsTransactionSuccessful(true);
            setSuccessMessage('Transaction successful');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while sending money.');
        }
    };

    // Render success message and hide the form if the transaction was successful
    if (isTransactionSuccessful) {
        return (
            <div className="max-w-sm mx-auto mt-10">
                <div className="bg-green-200 text-green-700 shadow-md rounded px-8 py-6 mb-4">
                    <p className="font-bold text-lg">{successMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-sm mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                        Recipient Email
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="recipient" 
                        type="email" 
                        placeholder="Recipient's email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="amount" 
                        type="number" 
                        placeholder="Amount to send"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-primary-50 hover:bg-primary-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Send Money
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendMoneyForm;
