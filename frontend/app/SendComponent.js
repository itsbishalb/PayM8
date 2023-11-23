import React, { useState } from 'react';

const SendMoneyForm = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log(`Sending ${amount} to ${recipient}`);
    };

    return (
        <div className="max-w-sm mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                        Recipient
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="recipient" 
                        type="text" 
                        placeholder="Recipient's username"
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Send Money
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendMoneyForm;
