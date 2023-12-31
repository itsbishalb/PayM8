"use client";
import axios from 'axios';
import React, { useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function WithdrawForm(props) {
    const email = props.userEmail;
    const [amount, setAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('paypal');
    const [paypalAccount, setPaypalAccount] = useState('');
    const [bankAccountHolder, setBankAccountHolder] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [sortCode, setSortCode] = useState('');
    const [error, setError] = useState(null); // State to store error message
    const [successMessage, setSuccessMessage] = useState('');
    const [isWithdrawalSuccessful, setIsWithdrawalSuccessful] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const withdrawalDetails = {
            userEmail: email, // Replace with the actual user email
            amount,
            method: withdrawMethod,
            paypalAccount: withdrawMethod === 'paypal' ? paypalAccount : undefined,
            bankDetails: withdrawMethod === 'bank' ? { bankAccountHolder, bankAccountNumber, sortCode } : undefined,
        };

        console.log('Withdrawing:', withdrawalDetails);

        try {
            const url = apiUrl + '/api/withdraw';
            const response = await axios.post(url, withdrawalDetails);
            console.log('Withdrawal successful:', response.data);

            setIsWithdrawalSuccessful(true);
            setSuccessMessage('Withdrawal successful');

            // Reset the form
            setAmount('');
            setWithdrawMethod(''); // Assuming you have a state for this
            setPaypalAccount('');
            setBankAccountHolder('');
            setBankAccountNumber('');
            setSortCode('');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error during withdrawal:', error);
            if (error.response) {
                setError(error.response.data.message); // Set the error message from the response
            } else {
                setError('Withdrawal failed');
            }
        }
    };

    // Render success message if the withdrawal was successful
    if (isWithdrawalSuccessful) {
        return (
            <div className="max-w-sm mx-auto my-8">
                <div className="bg-green-200 text-green-700 shadow-md rounded px-8 py-6 mb-4">
                    <p className="font-bold text-lg">{successMessage}</p>
                </div>
            </div>
        );
    }

    // Render the withdrawal form if the withdrawal was not successful
    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-8">
            <div className="mb-6">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Withdraw Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="0.00"
                    required
                />
            </div>

            <div className="mb-6">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Withdraw to:</span>
                <div className="flex items-center mb-4">
                    <input
                        id="paypal"
                        type="radio"
                        name="withdrawMethod"
                        value="paypal"
                        checked={withdrawMethod === 'paypal'}
                        onChange={() => setWithdrawMethod('paypal')}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="paypal" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        PayPal
                    </label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        id="bank"
                        type="radio"
                        name="withdrawMethod"
                        value="bank"
                        checked={withdrawMethod === 'bank'}
                        onChange={() => setWithdrawMethod('bank')}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="bank" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Bank Account
                    </label>
                </div>
            </div>

            {withdrawMethod === 'paypal' && (
                <div className="mb-6">
                    <label htmlFor="paypalAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        PayPal Account
                    </label>
                    <input
                        type="email"
                        id="paypalAccount"
                        name="paypalAccount"
                        value={paypalAccount}
                        onChange={(e) => setPaypalAccount(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="email@example.com"
                        required={withdrawMethod === 'paypal'}
                    />
                </div>
            )}

            {withdrawMethod === 'bank' && (
                <div>
                    <div className="mb-6">
                        <label htmlFor="bankAccountHolder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Holder Name
                        </label>
                        <input
                            type="text"
                            id="bankAccountHolder"
                            name="bankAccountHolder"
                            value={bankAccountHolder}
                            onChange={(e) => setBankAccountHolder(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={withdrawMethod === 'bank'}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="bankAccountNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={withdrawMethod === 'bank'}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="sortCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Sort Code
                        </label>
                        <input
                            type="text"
                            id="sortCode"
                            name="sortCode"
                            value={sortCode}
                            onChange={(e) => setSortCode(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={withdrawMethod === 'bank'}
                        />
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Withdraw
            </button>

            {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
    );
}
