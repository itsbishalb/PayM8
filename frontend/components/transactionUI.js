// pages/transactions.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const userEmail = Cookies.get('userEmail'); // Replace 'userEmail' with your actual cookie name

        if (!userEmail) {
            setError('User email not found in cookies.');
            return;
        }

        fetch(`http://localhost:8000/api/transactions/${userEmail}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setTransactions(data))
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const formatAmount = (type, amount) => {
        const sign = (type === 'Withdrawal' || type === 'send') ? '-' : '+';
        const color = (type === 'Withdrawal' || type === 'send') ? 'text-red-600' : 'text-green-600';
        
        return <span className={`${color} font-semibold`}>{`${sign} £${Math.round(amount*100)/100}`}</span>;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Transactions</h1>
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}
            <div className="flex flex-col gap-4">
                {transactions.map((transaction, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Type: <span className="font-semibold">{transaction.type}</span></p>
                        <p className="text-sm text-gray-600">Amount: {formatAmount(transaction.type, transaction.amount)}</p>
                        <p className="text-sm text-gray-600">Date: <span className="font-semibold">{new Date(transaction.date).toLocaleString()}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
